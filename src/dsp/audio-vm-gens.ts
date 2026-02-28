// dprint-ignore-file
// DO NOT MODIFY DIRECTLY, modify src/dsl/generator.ts to make changes

export type GenParameter = {
  name: string
  default?: number
  min?: number
  max?: number
  unit?: string
  curve?: 'linear' | 'exp2'
  description?: string
}

export type GenDescriptor = {
  name: string
  description?: string
  category?: string
  variants?: Record<string, string>
  parameters: GenParameter[]
}

export const gens: Record<string, GenDescriptor> = {
  Phasor: {
    name: 'Phasor',
    description: 'Phase ramp 0..1',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'offset', min: 0, max: 1, description: 'Offset phase' },
      { name: 'trig', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  Every: {
    name: 'Every',
    description: 'Generates an impulse on a regular period in bars',
    category: 'sequencers',
    parameters: [
      { name: 'bars', default: 0.25, min: 0.0001, unit: 'bars', description: 'Number of bars per impulse' }
    ]
  },
  White: {
    name: 'White',
    description: 'Uniform white noise with trigger reset',
    category: 'generators',
    parameters: [
      { name: 'seed', default: 0, description: 'Seed (any value, float bits used)' },
      { name: 'trig', description: 'Trigger resets phase' }
    ]
  },
  Lfosqr: {
    name: 'Lfosqr',
    description: 'Tempo-synced LFO square 0..1',
    category: 'generators',
    parameters: [
      { name: 'bar', default: 1, min: 0, unit: 'bars', description: 'Cycle length in bars' },
      { name: 'offset', default: 0, min: 0, description: 'Phase offset in beats' },
      { name: 'trig', description: 'Trigger reset' }
    ]
  },
  Lfosah: {
    name: 'Lfosah',
    description: 'Tempo-synced LFO sample-and-hold (random 0..1 per cycle)',
    category: 'generators',
    parameters: [
      { name: 'bar', default: 1, min: 0, unit: 'bars', description: 'Cycle length in bars' },
      { name: 'offset', default: 0, min: 0, description: 'Phase offset in beats' },
      { name: 'seed', default: 0, description: 'Seed (any value, float bits used)' },
      { name: 'trig', description: 'Trigger reset' }
    ]
  },
  Dc: {
    name: 'Dc',
    description: 'DC blocker (~8 Hz highpass, removes offset)',
    category: 'filters',
    parameters: [
      { name: 'input', description: 'Input signal' },
    ]
  },
  Gauss: {
    name: 'Gauss',
    description: 'Gaussian (normal-ish) noise via CLT from 6 uniforms, trigger reset',
    category: 'generators',
    parameters: [
      { name: 'seed', default: 0, description: 'Seed (any value, float bits used)' },
      { name: 'trig', description: 'Trigger resets phase' }
    ]
  },
  Impulse: {
    name: 'Impulse',
    description: 'Impulse train (1 at phase 0, 0 elsewhere)',
    category: 'sequencers',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'offset', min: 0, max: 1, description: 'Offset phase' },
      { name: 'trig', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  TestGain: {
    name: 'TestGain',
    description: 'Simple gain/amplifier',
    category: 'test',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'amount', default: 1, min: 0, max: 2, description: 'Gain amount' }
    ]
  },
  Freeverb: {
    name: 'Freeverb',
    description: 'Freeverb reverb',
    category: 'effects',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'room', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Room size' },
      { name: 'damping', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Damping' }
    ]
  },
  Saw: {
    name: 'Saw',
    description: 'Band-limited sawtooth oscillator',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'offset', min: 0, max: 1, description: 'Offset phase' },
      { name: 'trig', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  TestOversample: {
    name: 'TestOversample',
    description: 'Test generator that outputs sample rate dependent signal',
    category: 'test',
    parameters: [
    ]
  },
  Sine: {
    name: 'Sine',
    description: 'Sine wave generator',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'offset', min: 0, max: 1, unit: 'phase', description: 'Offset phase' },
      { name: 'trig', unit: 'impulse', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  Lfosine: {
    name: 'Lfosine',
    description: 'Tempo-synced LFO sine 0..1',
    category: 'generators',
    parameters: [
      { name: 'bar', default: 1, min: 0, unit: 'bars', description: 'Cycle length in bars' },
      { name: 'offset', default: 0, min: 0, description: 'Phase offset in beats' },
      { name: 'trig', description: 'Trigger reset' }
    ]
  },
  Slicer: {
    name: 'Slicer',
    description: 'Slice-based sample player',
    category: 'samplers',
    parameters: [
      { name: 'sample', unit: 'handle', description: 'Sample handle from freesound() or record()' },
      { name: 'speed', default: 1, unit: 'multiplier', description: 'Playback speed (negative for reverse)' },
      { name: 'offset', default: 0, min: 0, max: 1, unit: 'phase', description: 'Offset phase within slice' },
      { name: 'slice', default: 0, min: 0, max: 1, unit: 'fraction', description: 'Slice index (0..1)' },
      { name: 'threshold', default: 0, min: 0, max: 1, unit: 'fraction', description: 'Slice detection threshold' },
      { name: 'repeat', default: 0, unit: 'boolean', description: 'Loop slice when not 0' },
      { name: 'trig', description: 'Trigger to restart playback' }
    ]
  },
  Brown: {
    name: 'Brown',
    description: 'Brownian (random walk) noise',
    category: 'generators',
    parameters: [
      { name: 'seed', default: 0, description: 'Seed' },
      { name: 'trig', description: 'Trigger resets walk' }
    ]
  },
  Euclid: {
    name: 'Euclid',
    description: 'Euclidean rhythm trigger (pulses over steps with offset)',
    category: 'sequencers',
    parameters: [
      { name: 'pulses', default: 4, min: 0, description: 'Number of hits' },
      { name: 'steps', default: 8, min: 1, description: 'Number of steps' },
      { name: 'offset', default: 0, min: 0, description: 'Rotation offset' },
      { name: 'bar', default: 1, min: 0, unit: 'bars', description: 'Pattern length in bars' }
    ]
  },
  Pwm: {
    name: 'Pwm',
    description: 'Band-limited PWM oscillator',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'width', default: 0.5, min: 0, max: 1, description: 'Pulse width' },
      { name: 'offset', min: 0, max: 1, description: 'Offset phase' },
      { name: 'trig', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  Ad: {
    name: 'Ad',
    description: 'Attack/Decay envelope',
    category: 'generators',
    parameters: [
      { name: 'attack', default: 0.005, min: 0.00001, unit: 's', description: 'Attack time' },
      { name: 'decay', default: 0.2, min: 0.00001, unit: 's', description: 'Decay time' },
      { name: 'exponent', default: 1, description: 'Curve (0=linear, >0=power, <0=mirrored)' },
      { name: 'trig', description: 'Trigger impulse' }
    ]
  },
  Onepole: {
    name: 'Onepole',
    description: 'One-pole filter (lowpass / highpass)',
    category: 'filters',
    variants: {
      lp1: 'Lowpass filter (One-pole)',
      hp1: 'Highpass filter (One-pole)'
    },
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'cutoff', default: 1000, min: 20, max: 20000, unit: 'hz', description: 'Cutoff frequency' }
    ]
  },
  Sqr: {
    name: 'Sqr',
    description: 'Band-limited square oscillator',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'offset', min: 0, max: 1, description: 'Offset phase' },
      { name: 'trig', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  Hold: {
    name: 'Hold',
    description: 'Holds its input if zero is received',
    category: 'utilities',
    parameters: [
      { name: 'input', description: 'Input signal' },
    ]
  },
  Lfosaw: {
    name: 'Lfosaw',
    description: 'Tempo-synced LFO saw 0..1',
    category: 'generators',
    parameters: [
      { name: 'bar', default: 1, min: 0, unit: 'bars', description: 'Cycle length in bars' },
      { name: 'offset', default: 0, min: 0, description: 'Phase offset in beats' },
      { name: 'trig', description: 'Trigger reset' }
    ]
  },
  Compressor: {
    name: 'Compressor',
    description: 'Dynamic range compressor with soft knee',
    category: 'mixing',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'attack', default: 0.003, min: 0.0001, max: 1, unit: 's', description: 'Attack time' },
      { name: 'release', default: 0.1, min: 0.0001, max: 5, unit: 's', description: 'Release time' },
      { name: 'threshold', default: -12, min: -80, max: 0, unit: 'dB', description: 'Threshold in dB' },
      { name: 'ratio', default: 4, min: 1, max: 20, description: 'Compression ratio' },
      { name: 'knee', default: 6, min: 0, max: 40, unit: 'dB', description: 'Knee width in dB' },
      { name: 'key', description: 'Key/sidechain input (unpatched = use input as key)' }
    ]
  },
  Emit: {
    name: 'Emit',
    description: 'Emits a value',
    category: 'test',
    parameters: [
      { name: 'value', description: 'Value to emit' }
    ]
  },
  Fractal: {
    name: 'Fractal',
    description: 'Fractal (octave-sum) noise with rate, octaves, gain',
    category: 'generators',
    parameters: [
      { name: 'seed', default: 0, description: 'Seed' },
      { name: 'rate', default: 2, min: 0, unit: 'hz', description: 'Base rate' },
      { name: 'octaves', default: 4, min: 1, max: 16, description: 'Number of octaves' },
      { name: 'gain', default: 0.5, min: 0, max: 1, description: 'Octave amplitude decay' },
      { name: 'trig', description: 'Trigger resets phase' }
    ]
  },
  Lforamp: {
    name: 'Lforamp',
    description: 'Tempo-synced LFO ramp 0..1',
    category: 'generators',
    parameters: [
      { name: 'bar', default: 1, min: 0, unit: 'bars', description: 'Cycle length in bars' },
      { name: 'offset', default: 0, min: 0, description: 'Phase offset in beats' },
      { name: 'trig', description: 'Trigger reset' }
    ]
  },
  Tri: {
    name: 'Tri',
    description: 'Band-limited triangle oscillator',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'offset', min: 0, max: 1, description: 'Offset phase' },
      { name: 'trig', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  Pitchshift: {
    name: 'Pitchshift',
    description: 'Grain-based pitch shifter (overlap-add)',
    category: 'effects',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'ratio', default: 1, min: 0.01, max: 10, unit: 'multiplier', description: 'Pitch ratio (e.g. 2 = one octave up)' }
    ]
  },
  Zerox: {
    name: 'Zerox',
    description: 'Positive zero-crossing detector (1 when input crosses from ≤0 to >0)',
    category: 'utilities',
    parameters: [
      { name: 'input', description: 'Input signal' },
    ]
  },
  Limiter: {
    name: 'Limiter',
    description: 'Peak limiter with release smoothing',
    category: 'mixing',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'threshold', default: 0, min: -80, max: 0, unit: 'dB', description: 'Limit threshold in dB' },
      { name: 'release', default: 0.1, min: 0.0001, max: 5, unit: 's', description: 'Release time' }
    ]
  },
  At: {
    name: 'At',
    description: 'Probabilistic trigger at bar start and/or every N bars',
    category: 'sequencers',
    parameters: [
      { name: 'bar', default: 0, min: 0, unit: 'bars', description: 'Start time in bars' },
      { name: 'every', default: 0.25, min: 0, unit: 'bars', description: 'Interval in bars (0 = single trigger at start)' },
      { name: 'prob', default: 1, min: 0, max: 1, unit: 'factor', description: 'Probability of 1 when trigger fires' },
      { name: 'seed', default: 0, description: 'Seed for deterministic random' }
    ]
  },
  Diodeladder: {
    name: 'Diodeladder',
    description: 'Diode ladder filter (4-pole, with HPF and soft saturation)',
    category: 'filters',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'cutoff', default: 1000, min: 20, max: 20000, unit: 'hz', description: 'Cutoff frequency' },
      { name: 'q', default: 0.5, min: 0, max: 1, description: 'Resonance' },
      { name: 'k', default: 0, min: 0, max: 1, description: 'HPF amount' },
      { name: 'sat', default: 1, min: 0.1, max: 10, description: 'Input saturation' }
    ]
  },
  Ramp: {
    name: 'Ramp',
    description: 'Band-limited ramp (inverse saw) oscillator',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 440, min: 0, unit: 'hz', description: 'Frequency' },
      { name: 'offset', min: 0, max: 1, description: 'Offset phase' },
      { name: 'trig', description: 'Trigger impulse, resets to offset phase' }
    ]
  },
  Smooth: {
    name: 'Smooth',
    description: 'Smooth interpolated random steps with rate and curve',
    category: 'generators',
    parameters: [
      { name: 'seed', default: 0, description: 'Seed' },
      { name: 'rate', default: 2, min: 0, unit: 'hz', description: 'Step rate' },
      { name: 'curve', default: 1, description: 'Interpolation curve (0=linear, 1=smooth5)' },
      { name: 'trig', description: 'Trigger resets acc' }
    ]
  },
  Lfotri: {
    name: 'Lfotri',
    description: 'Tempo-synced LFO triangle 0..1',
    category: 'generators',
    parameters: [
      { name: 'bar', default: 1, min: 0, unit: 'bars', description: 'Cycle length in bars' },
      { name: 'offset', default: 0, min: 0, description: 'Phase offset in beats' },
      { name: 'trig', description: 'Trigger reset' }
    ]
  },
  Adsr: {
    name: 'Adsr',
    description: 'Attack/Decay/Sustain/Release envelope',
    category: 'generators',
    parameters: [
      { name: 'attack', default: 0.005, min: 0.00001, unit: 's', description: 'Attack time' },
      { name: 'decay', default: 0.2, min: 0.00001, unit: 's', description: 'Decay time' },
      { name: 'sustain', default: 0.7, min: 0, max: 1, description: 'Sustain level (0..1)' },
      { name: 'release', default: 0.3, min: 0.00001, unit: 's', description: 'Release time' },
      { name: 'exponent', default: 1, description: 'Curve (0=linear, >0=power, <0=mirrored)' },
      { name: 'trig', description: 'Trigger (gate): high = hold sustain, low = release' }
    ]
  },
  Analyser: {
    name: 'Analyser',
    description: 'Analyze the signal',
    category: 'utilities',
    parameters: [
      { name: 'input', description: 'Input signal' },
    ]
  },
  Biquad: {
    name: 'Biquad',
    description: 'Biquad filter',
    category: 'filters',
    variants: {
      lp: 'Lowpass filter (Biquad)',
      hp: 'Highpass filter (Biquad)',
      bp: 'Bandpass filter (Biquad)',
      bs: 'Bandstop filter (Biquad)',
      ap: 'Allpass filter (Biquad)'
    },
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'cutoff', default: 1000, min: 20, max: 20000, unit: 'hz', description: 'Cutoff frequency' },
      { name: 'q', default: 0.70710678, min: 0.01, max: 20, description: 'Q factor' }
    ]
  },
  Envfollow: {
    name: 'Envfollow',
    description: 'Envelope follower with attack and release time',
    category: 'utilities',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'attack', default: 0.01, min: 0.0001, max: 10, unit: 's', description: 'Attack time' },
      { name: 'release', default: 0.1, min: 0.0001, max: 10, unit: 's', description: 'Release time' }
    ]
  },
  Sah: {
    name: 'Sah',
    description: 'Sample-and-hold: capture input on trigger rising edge',
    category: 'utilities',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'trig', description: 'Trigger: on rising edge, hold current input' }
    ]
  },
  Velvet: {
    name: 'Velvet',
    description: 'Velvet noise stereo reverb (prime-based delay lines)',
    category: 'effects',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'room', default: 0.5, min: 0.05, max: 1, unit: 'normal', description: 'Room size' },
      { name: 'damping', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'High-frequency damping' },
      { name: 'decay', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Decay / feedback' }
    ]
  },
  Fdn: {
    name: 'Fdn',
    description: 'Feedback delay network reverb (8-line Hadamard, modulated)',
    category: 'effects',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'room', default: 0.5, min: 0.05, max: 1, unit: 'normal', description: 'Room size' },
      { name: 'damping', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'High-frequency damping' },
      { name: 'decay', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Decay / feedback' },
      { name: 'depth', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Delay modulation depth' }
    ]
  },
  Pink: {
    name: 'Pink',
    description: '1/f pink noise (Voss-McCartney 8 rows)',
    category: 'generators',
    parameters: [
      { name: 'seed', default: 0, description: 'Seed' },
      { name: 'trig', description: 'Trigger resets' }
    ]
  },
  Dattorro: {
    name: 'Dattorro',
    description: 'Dattorro-style stereo reverb (modulated tank)',
    category: 'effects',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'room', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Room size / decay' },
      { name: 'damping', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'High-frequency damping' },
      { name: 'bandwidth', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Input bandwidth' },
      { name: 'indiff1', default: 0.75, min: 0, max: 1, unit: 'normal', description: 'Input diffusion 1' },
      { name: 'indiff2', default: 0.625, min: 0, max: 1, unit: 'normal', description: 'Input diffusion 2' },
      { name: 'decdiff1', default: 0.7, min: 0, max: 1, unit: 'normal', description: 'Decay diffusion 1' },
      { name: 'decdiff2', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Decay diffusion 2' },
      { name: 'excrate', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Modulation rate' },
      { name: 'excdepth', default: 0.5, min: 0, max: 1, unit: 'normal', description: 'Modulation depth' },
      { name: 'predelay', default: 0, min: 0, max: 1, unit: 's', description: 'Pre-delay' }
    ]
  },
  Random: {
    name: 'Random',
    description: 'Deterministic uniform [0,1] per sample from seed',
    category: 'math',
    parameters: [
      { name: 'seed', default: 0, description: 'Seed' }
    ]
  },
  Slew: {
    name: 'Slew',
    description: 'Slew rate limiter with separate rise/fall and curve',
    category: 'utilities',
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'up', default: 0.5, min: 0, max: 1, description: 'Rise coefficient (0=slow, 1=instant)' },
      { name: 'down', default: 0.5, min: 0, max: 1, description: 'Fall coefficient (0=slow, 1=instant); ≤0 uses up' },
      { name: 'exp', default: 1, description: 'Curve exponent (0=linear, >0=power, <0=mirrored)' }
    ]
  },
  Inc: {
    name: 'Inc',
    description: 'Ramp from offset to ceil at hz rate',
    category: 'generators',
    parameters: [
      { name: 'hz', default: 1, min: 0, unit: 'hz', description: 'Rate' },
      { name: 'ceil', default: 1, min: 0, description: 'Ceiling value' },
      { name: 'offset', default: 0, min: 0, description: 'Value on trigger' },
      { name: 'trig', description: 'Trigger impulse, resets to offset value' }
    ]
  },
  Biquadshelf: {
    name: 'Biquadshelf',
    description: 'Biquad shelf and peak filters (gain-based)',
    category: 'filters',
    variants: {
      ls: 'Low shelf (Biquad)',
      hs: 'High shelf (Biquad)',
      peak: 'Peak (notch) (Biquad)'
    },
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'cutoff', default: 1000, min: 20, max: 20000, unit: 'hz', description: 'Cutoff frequency' },
      { name: 'q', default: 0.70710678, min: 0.01, max: 20, description: 'Q factor (peak only)' },
      { name: 'gain', default: 0, min: -40, max: 40, unit: 'dB', description: 'Gain in dB' }
    ]
  },
  Sampler: {
    name: 'Sampler',
    description: 'Sample player',
    category: 'samplers',
    parameters: [
      { name: 'sample', description: 'Sample handle from freesound() or record()' },
      { name: 'speed', default: 1, description: 'Playback speed (negative for reverse)' },
      { name: 'offset', default: 0, min: 0, max: 1, description: 'Normalized start offset' },
      { name: 'repeat', default: 0, description: 'Loop sample when > 0' },
      { name: 'trig', description: 'Trigger to restart playback' }
    ]
  },
  Moog: {
    name: 'Moog',
    description: 'Moog ladder filter (4-pole, nonlinear)',
    category: 'filters',
    variants: {
      lpm: 'Lowpass filter (Moog)',
      hpm: 'Highpass filter (Moog)'
    },
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'cutoff', default: 1000, min: 50, max: 22040, unit: 'hz', description: 'Cutoff frequency' },
      { name: 'q', default: 0.70710678, min: 0.01, max: 0.985, description: 'Q factor' }
    ]
  },
  Svf: {
    name: 'Svf',
    description: 'State variable filter (SVF)',
    category: 'filters',
    variants: {
      lps: 'Lowpass filter (SVF)',
      hps: 'Highpass filter (SVF)',
      bps: 'Bandpass filter (SVF)',
      bss: 'Bandstop filter (SVF)',
      peaks: 'Peak (notch) filter (SVF)',
      aps: 'Allpass filter (SVF)'
    },
    parameters: [
      { name: 'input', description: 'Input signal' },
      { name: 'cutoff', default: 1000, min: 50, max: 20000, unit: 'hz', description: 'Cutoff frequency' },
      { name: 'q', default: 0.70710678, min: 0.01, max: 0.985, description: 'Q factor' }
    ]
  }
}
