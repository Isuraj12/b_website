import math
import struct
import wave

# Generate a delicate, soothing ambient celesta / chime melody loop
sample_rate = 44100
duration = 16.0  # seconds
num_samples = int(sample_rate * duration)

# Gentle pentatonic melody notes (Hz)
chords = [
    [261.63, 329.63, 392.00, 523.25], # C maj (C4, E4, G4, C5)
    [220.00, 261.63, 329.63, 440.00], # A min (A3, C4, E4, A4)
    [174.61, 220.00, 261.63, 349.23], # F maj (F3, A3, C4, F4)
    [196.00, 246.94, 293.66, 392.00], # G maj (G3, B3, D4, G4)
]

audio_data = []

for i in range(num_samples):
    t = i / sample_rate
    chord_idx = int((t / 4.0) % 4)
    chord = chords[chord_idx]
    
    # Envelope for current bar
    t_in_chord = t % 4.0
    decay = math.exp(-t_in_chord * 0.9)
    
    val = 0.0
    for idx, freq in enumerate(chord):
        # Celesta / soft bell timbre with harmonics
        note_t = max(0, t_in_chord - idx * 0.25)
        note_decay = math.exp(-note_t * 1.5) if t_in_chord >= idx * 0.25 else 0
        
        harmonic1 = math.sin(2 * math.pi * freq * t)
        harmonic2 = 0.3 * math.sin(2 * math.pi * freq * 2.0 * t)
        harmonic3 = 0.1 * math.sin(2 * math.pi * freq * 3.0 * t)
        
        val += (harmonic1 + harmonic2 + harmonic3) * note_decay * 0.25

    # Gentle stereo panning and overall smooth master fade in / fade out
    master_env = 1.0
    if t < 0.5:
        master_env = t / 0.5
    elif t > duration - 0.5:
        master_env = (duration - t) / 0.5
        
    sample = int(val * master_env * 16000)
    sample = max(-32767, min(32767, sample))
    audio_data.append(sample)

with wave.open("public/audio/birthday-ambient.wav", "wb") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(sample_rate)
    data = struct.pack(f"<{len(audio_data)}h", *audio_data)
    wav_file.writeframes(data)

# Also create a copy as .mp3 filename so whichever is loaded succeeds
import shutil
shutil.copyfile("public/audio/birthday-ambient.wav", "public/audio/birthday-ambient.mp3")
print("Audio generated successfully.")
