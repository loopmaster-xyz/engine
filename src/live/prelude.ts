export const CONTROL_PRELUDE_SRC = `\
/**
 * control prelude
 */

mix => $
bpm = 120
transpose = 0
tune = 1
scale = 'major'
o0=2 o1=4 o2=8 o3=16 o4=32 o5=64 o6=128 o7=256 o8=512 o9=1024 o10=2048 o11=4096

/**
 * array
 */

map=(array,fn)->{
  newArray:=[]
  for (el, i of array) newArray.push(fn(el, i))
  newArray
}

range=(start,end)->{
  from:=floor(start)
  to:=floor(end)
  out:=[]
  if (from <= to) {
    for (i in from .. to) out.push(i)
  } else {
    for (i in to .. from) out.push(from - i + to)
  }
  out
}

sum=array->{
  sum:=0
  for (el of array) sum += el
  sum
}

avg=array->{
  sum:=0
  for (el of array) sum += el
  sum/array.length
}

shuffle=(array,seed=0)->{
  copy:=[]
  for (el of array) copy.push(el)
  n:=copy.length
  for (k in 0 .. n - 2) {
    i:=n-1-k
    r:=fract(seed*12.9898+i*78.233+k*45.17)
    j:=floor(r*(i+1))
    tmp:=copy[i]
    copy[i]=copy[j]
    copy[j]=tmp
  }
  copy
}

reverse=array->{
  copy:=[]
  n:=array.length
  for (i in 0 .. n - 1) copy.push(array[n-1-i])
  copy
}

reduce=(arr,reducer,initial=0)->{
  acc:=initial
  for (i in 0..arr.length-1) {
    item:=arr[i]
    acc=reducer(acc, item, i)
  }
  acc
}

slice=(array,start=0,end=array.length)->{
  n:=array.length
  s:=floor(start)
  e:=floor(end)
  if (s < 0) s=n+s
  if (e < 0) e=n+e
  s=clamp(s,0,n)
  e=clamp(e,0,n)
  result:=[]
  if (e <= s) return result
  for (i in s .. e - 1) result.push(array[i])
  result
}

take=(array,n=array.length)->slice(array,0,n)

/**
 * effects
 */

delay=(in,seconds=0.5,feedback=0,cb=x->x,size=1,mode=write)->{
  buf:=alloc(size)
  sample:=read(buf,seconds)
  mode(cb(in+sample*feedback),buf)
  if (mode==write) {
    sample=read(buf,seconds)
    if (feedback) {
      mode(cb(in+sample*feedback),buf)
      sample=read(buf,seconds)
    }
    advance(buf)
  }
  sample
}

tube=(in,drive=3,bias=.2)->{
  tanh((in+bias)*drive)-tanh(bias*drive)
}

// Modulated delay effect with LFO-controlled delay time
moddelay=(in,base,depth,rate,feedback,offset=0,mode=write)->{
  lfo := lfotri(rate, offset)
  seconds := base + depth * lfo
  delay(in, seconds, feedback, mode)
}

// Classic flanger effect (modulated comb filter)
flanger=(in,rate=1,depth=0.00125,base=0.00125,feedback=0.7)->{
  moddelay(in, base, depth, rate, feedback)
}

// Multi-voice chorus effect with spread and modulation
chorus=(in,voices=3,base=0.02,depth=0.006,rate=0.25,spread=.5,mode=write)->{
  sum = 0
  voices = max(voices,1)

  for (i in 0 .. voices - 1) {
    phase = (i / voices) * spread
    sum += moddelay(
      in,
      base,
      depth,
      rate,
      feedback:0,
      phase,
      mode
    )
  }

  sum / voices
}

/**
 * utilities
 */

print = value -> { emit(value); value }

// Compile-time only: label(bar, text, color?) for timeline header/minimap visualization. bar is 1-based, color 0-5.
label = (bar, text, color=1) -> 0

midiToHz = midi -> {
  m := midi + transpose
  emit(m)
  440 * 2 ** ((m - 69) / 12) * tune
}

ratchet = (n, trig) -> {
  phase := phasor(n, trig)
  zerox(phase - .5)
}

// Keep or drop incoming triggers with probability p.
skip=(trig,p=.5,seed=0)->{
  r:=random(seed) |> sah($,trig)
  trig * step(r,p)
}

// Basic flam: original hit plus one delayed softer hit.
flam=(trig,seconds=.2,decay=.7)->trig + delay(trig*decay,seconds)

// mini event interpreter.
// Input event shape: { hz, trig, from, id, glide? } encoded as [hz, trig, from, id, glide?].
// Callback receives one object argument: { hz, trig }.
// trig semantics in callback:
// - >0 on onset (velocity from mini event)
// - 1 while sustained (event still active, no onset)
// - 0 when voice is off/releasing
play=(events,cb,voices=1,glide=0)->{
  voiceCount:=max(1,floor(voices))
  lanes:=[0..voiceCount-1].map(()->{
    return {
      state: store({
        id: 0,
        hz: 0,
        targetHz: 0,
        glideFrom: 0,
        glide: 0,
        onsetTrig: 0,
        onsetSeq: 0,
        active: 0,
        touched: 0,
      }),
    }
  })

  // Reset per-block edge fields.
  for (i in 0 .. voiceCount - 1) {
    lane:=lanes[i].state
    lane.onsetTrig=0
    lane.touched=0
  }

  // Assign incoming events to lane states by stable mini id.
  if (isarray(events)) {
    for (event of events) {
      if (isarray(event) && event.length >= 4) {
        hz:=event[0]
        trig:=event[1]
        from:=event[2]
        id:=floor(event[3])
        glideEvt:=event.length >= 5 ? event[4] : 0
        if (hz > 0 && id > 0) {
          slot:=-1
          for (i in 0 .. voiceCount - 1) {
            if (lanes[i].state.id == id) {
              slot=i
              break
            }
          }
          if (slot < 0) {
            for (i in 0 .. voiceCount - 1) {
              if (lanes[i].state.active <= 0) {
                slot=i
                break
              }
            }
          }
          // Deterministic fallback when all lanes are busy.
          if (slot < 0) slot=(id - 1) % voiceCount

          lane:=lanes[slot].state
          lane.id=id
          lane.targetHz=hz
          if (trig > 0) {
            lane.onsetTrig=trig
            lane.onsetSeq+=1
            lane.glideFrom=from > 0 ? from : hz
            lane.glide=glideEvt > 0 ? glideEvt : 0
          }
          lane.active=1
          lane.touched=1
        }
      }
    }
  }

  sum:=0
  for (i in 0 .. voiceCount - 1) {
    lane:=lanes[i].state
    if (lane.touched <= 0) {
      // Mark lane free but keep last hz so envelopes can release naturally.
      lane.id=0
      lane.active=0
    }
    // Keep Inc call count/order stable across lanes so each lane keeps its own glide state slot.
    laneGlide:=lane.glide > 0 ? lane.glide : glide
    glideRate:=laneGlide > 0 ? 1 / max(laneGlide,.00001) : 0
    glideTrig:=lane.touched > 0 && lane.onsetTrig > 0 && lane.glideFrom > 0 ? lane.onsetSeq : 0
    glidePos:=inc(glideRate,1,0,glideTrig)
    if (lane.touched > 0) {
      lane.hz=laneGlide > 0 ? lerp(lane.glideFrom,lane.targetHz,glidePos) : lane.targetHz
    }
    trig:=lane.touched > 0 ? (lane.onsetTrig > 0 ? lane.onsetTrig : 1) : 0
    note:={ hz: lane.hz, trig }
    sum+=cb(note)
  }
  sum/voiceCount
}

poly=(count,trig,notescb,voicecb)->{
  voices:=[0..count-1].map(()->{
    return { state: store({ hz: 0 }) }
  })
  trigs:=[0..count-1].map(()->audio(0))

  current:=scalarmax(acc(trig))
  trigs[current]=trig
  voices[current].state.hz=notescb(trig)
  voices.map((v,i)->{
    hz:=v.state.hz
    if (hz > 0) return voicecb(v.state.hz,trigs[i])
  }).avg()
}

dec=(hz=1,floor=0,offset=1,trig)->1-inc(hz,1-floor,1-offset,trig)

buses=[[0,0],[0,0],[0,0],[0,0],[0,0]]

bus=(index,in)->{
  if (isundefined(in)) return buses[index]
  else if (isarray(in)) {
    buses[index][0]+=in[0]
    buses[index][1]+=in[1]
    analyser(in[0])
    return buses[index]
  }
  else {
    buses[index]+=analyser(in)
    return buses[index]
  }
}

buss=(index,in)->solo(in)

// Convert decibels to linear gain multiplier (10^(dB/20))
db=x->10**(x/20)

// Convert bipolar signal to unipolar ([-1,1] to [0,1])
uni=x->x*.5+.5

// Convert unipolar signal to bipolar ([-1,1] to [0,1])
bi=x->x*2-1

// Crossfade between two signals
crossfade=(a,b,t)->lerp(a,b,clamp(t,0,1))

// Convert semitones to frequency multiplier (2^(semitones/12))
semis=x->2**(x/12)

// Convert mono signal to stereo, optionally with delay-based widening
stereo=(in,width=0)->[in,delay(in,seconds:width)]

// Convert stereo signal to mono by averaging channels
mono=([L,R])->(L+R)*.5

// Adjust stereo width using mid-side processing (1 = normal, 0 = mono, >1 = wider)
stereowidth=([L,R],width=1)->{
  mid:=(L+R)*0.5
  side:=(L-R)*0.5
  side*=width
  return [mid+side,mid-side]
}

// Widen stereo signal by delaying high frequencies in right channel
widen=([L,R],seconds=0.0001)->{
  cutoff:=200
  loL:=lp(L,cutoff)
  loR:=lp(R,cutoff)
  hiL:=hp(L,cutoff)
  hiR:=hp(R,cutoff)
  return [loL+hiL,loR+delay(hiR,seconds)]
}

// Pan stereo signal (0=left, 0.5=center, 1=right)
pan=([L,R],balance=0.5)->{
  p:=clamp(balance,0,1)
  return [L*(1-p),R*p]
}

// Vocoder effect using bandpass filters and envelope following
vocoder=(carrier,modulator,bands=16,attack=.008,release=.04,freqMin=80,freqMax=7700)->{
  logRange := log(freqMax / freqMin)
  step     := logRange / (bands - 1)
  r := exp(step)
  Q := clamp(1 / (r - 1), 8, 20)
  s := 0
  for (i in 0 .. bands-1) {
    freq := freqMin * exp(i * step)
    modBand := bp(modulator, freq, Q)
    env     := envfollow(abs(modBand), attack, release)
    carBand := bp(carrier, freq, Q)
    s += carBand * env
  }
  s/bands
}

// Granular synthesis-inspired trigger generator based on speed
grain=(speed=1,seed)->step(.999+.001*((1-clamp(speed,0,1))**.293),random(seed))

// 3-band equalizer with low/mid/high controls
eq3=(in,low=0,mid=0,high=0,lf=500,mf=2000,hf=8000)->{
  lo:=ls(in,cutoff:lf,gain:low)
  mi:=peak(in,cutoff:mf,q:1,gain:mid)
  hi:=hs(in,cutoff:hf,gain:high)
  lo+mi+hi
}

/**
 * aliases
 */
ntof = midiToHz
mtof = midiToHz
outs = solo
sout = solo

/**
 * synths
 */

// Karplus-Strong plucked string synthesis
karplus=(hz,pluck=pink,seed=123,attack=.01,decay=.1,exponent=50,damping=.5,feedback=.985,trig)->{
  oversample(4, () -> {
    exc := pluck(seed, trig) * ad(attack,decay,exponent,trig)
    seconds := safediv(1, hz)
    cutoff := hz*((1-damping)*100)
    delay(exc,seconds,feedback,x -> tanh(lp1(x, cutoff)))
  })
}

rhodes=(hz,trig)->{
  env:=adsr(.00001,1.4,.92,8,e:6,trig)
  oversample(4,()->{
    sine(hz+sine(hz*1.013,trig)*hz*7.25,trig)*ad(.00001,1.2,e:6,trig)*.12
    +sine(hz+sine(hz*2.752,trig)*hz*2.15,trig)*env*.4
    +tri(hz)*env
    |> $+chorus($,3,.0082,.0015,2.22,12.8)*.25
    |> lpm($,400+3200*ad(.03,3.85,trig),.4)
    |> atan($*.15)
  })
  |> dc($)
}

// Supersaw oscillator with detuned voices
supersaw=(hz,voices=5,spread=.05)->{
  s := 0
  for (i in 0 .. voices) {
    d := (i/(voices+1)-.5)*spread
    s += saw(hz*(1+d))
  }
  s / voices
}

bdsynth=(
  base=#1*o2,
  punch=25000k,
  offset=0.0006,
  cutoff=5k,
  q=.25,
  amp=trig->ad(.0001,.5,40,trig),
  fm=trig->ad(.00008,.013,900,trig),
  filter=trig->ad(.000147,.25,50.000,trig),
  trig=tram('x-x-x-x-'),
)->sine(base+punch*fm(trig),offset,trig)*amp(trig) |> lps($,base+cutoff*filter(trig),q) |> limiter($)

bd=(base,punch,offset,sampleOffset=0,cutoff,q,amp,fm,filter,trig=tram('x-x-x-x-'))->{
  sample:=record(.2,()->bdsynth(base,punch,offset,cutoff,q,amp,fm,filter,trig:1))
  sampler(sample,offset:sampleOffset,trig)
}

hhsynth=(width=.4,trig)->{
  env:=adsr(.06,.05 ,.950 ,.1 ,32,trig)
  oversample(8,()->[205.3,369.6,304.4,522.7,800,540].map(x->pwm(x,width)).avg()*env
  |> bp($,8000,.85)|>bp($,10k,.85)|>hp($,11k,.85)) |> tanh($*6)
}

ch=(width=.9,trig=tram('--x-',1/4))->{
  sample:=record(.2,()->hhsynth(width,trig:step(.9,dec())))
  sampler(sample,trig,offset:.29)*ad(0.0001,.5,3,trig)*.6
}

oh=(width=.4,trig=tram('-x',1/4))->{
  sample:=record(.2,()->hhsynth(width,trig:step(.9,dec())))
  sampler(sample,trig,offset:.299)*ad(0.0001,.9,trig)*.8
}

sdsynth=(seed=7,base=#5*o2,trig=step(.9,dec()))->{
  amp:=ad(.0001,1.7366,20,trig)
  noise:=adsr(.0001,.0231 ,.870 ,.3159 ,8.000,trig)
  click:= ad(.0001, .02, 4, trig)
  pitch:= ad(.0001, .3095 , 20, trig)
  pitchAmt:=base*2
  ;(sine(base+pitch*pitchAmt,trig)*.3 |> bps($, base * 2, .8))*amp

  +(white(seed,trig) |> hps($, 1800,.4) |> bps($, 7100, .4))*noise
  +(white(8,trig) |> hps($, 4000,.6))*click
  |> tube($,2,.01)*.3
}

sd=(seed,trig=tram('-x',1/2))->{
  sample:=record(.2,()->sdsynth(seed))
  sampler(sample,trig)
}

drums=(seed=1)->{
  chw := fract(seed * 1234.1234)
  ohw := fract(seed * 4567.4567)
  bd()+sd(seed)+ch(chw)+oh(ohw) |> limiter($)
}

marimba=(hz,trig=every(1/8))->{
  s := 0
  for (i in 0 .. 7) {
    s += sine(hz*(1+i**2)+lfotri(1/4,offset:i*0.2)*hz/50)*(i%2==1?3:1)*(7-i**.82)*(i==0?7:1)
  }
  s /= 300
  s += pink()*ad(.001,.3,e:3,trig)*.15 |> bp($,100,3)

  s = s |> lp($,1000+6k*ad(.0003,.8,e:1.5,trig))
  s = s |> $+chorus($,voices:2,base:.0003,depth:.00009,rate:.25,spread:.6,mode:append)

  s *= adsr(.003,.2,.3,.6,e:1.5,trig)
}

piano=(hz,trig)->{
  s:=oversample(4,()->sine(hz+sine(hz*7,trig)*hz*1.007,trig)+sine(hz+sine(hz*3,trig)*hz*1.004,trig)*.25)*.5
  s+=gauss()*.3*ad(.00001,.01,e:3,trig)
  s*=adsr(.0003,.18,.9,.8,e:9,trig)
  hzco:=hz**.79
  s=s*.15+delay(s,1.2/hzco,.84,mode:append,x->tanh(lp1(x,hz*8)))*.015
         +delay(s,1.8/hzco,.94,mode:append,x->tanh(lp1(x,hz*3)))*.015
}

bongo=(hz,trig)->{
  pink()*ad(.0008,.01+.02*(random(123) |> sah($,trig)),2,trig)*(1+.6*(random(567) |> sah($,trig)))+
  sine(hz+sine(300)*50+sine(800+800*(random(234) |> sah($,trig)))*(700+200*(random(345) |> sah($,trig))))*ad(.01,.12,3,trig)
  *(.2+.8*(random(456) |> sah($,trig)))
}

flute=(hz,trig)->{
  env:=adsr(.05,.10,.82,.24,3,trig)
  vib:=lfosine(5.0)*0.0015*ad(.2,1.5,trig)
  freq:=hz*(1+vib)

  air:=bp(pink(),hz*2.0,1.1)*.435*env
  body:=sine(freq)*.95 + sine(freq*2)*.035 + sine(freq*3.02)*.065

  s:=body + air
  s:=lp(s,hz*8 + 1200,.7)
  tanh(s*.95)*env*.45
}

pad=(notes,trig)->{
  notes.map(hz->
    (tri(hz*2.035)*.22+saw(hz*(1+.003*lfosine(1/2)))+sqr(hz/2.03)*.08)
    |> lpm($,500+lfosine(4)*2000,1)*.5 + hpm($,6000,.5)*.02).avg()

  * adsr(.03,.3,.95,1.5,trig)
  |> ($+fdn($,.5,.5,.5,1))*.5
}

;
`

export const CONTROL_PRELUDE_SEPARATOR = '\n'

export function getControlPreludeText(): { preludeText: string; preludeLen: number; preludeLines: number } {
  const prelude = CONTROL_PRELUDE_SRC.endsWith('\n') ? CONTROL_PRELUDE_SRC : CONTROL_PRELUDE_SRC + '\n'
  const preludeText = prelude + CONTROL_PRELUDE_SEPARATOR
  const preludeLen = preludeText.length
  const preludeLines = preludeText.split('\n').length - 1
  return { preludeText, preludeLen, preludeLines }
}

export function withControlPrelude(src: string): { fullSrc: string; preludeLen: number; preludeLines: number } {
  const { preludeText, preludeLen, preludeLines } = getControlPreludeText()
  const fullSrc = preludeText + src
  return { fullSrc, preludeLen, preludeLines }
}
