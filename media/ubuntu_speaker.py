import shlex, subprocess
import os


def french_speaker(text: str, language: str = "french", filename="tempo"):

    map_lang = {
        "french": "fr-FR",
        "english": "en-US",
    }
    file_ = f"{filename}.wav"
    cmd_speaker = f"""pico2wave -l {map_lang[language]} -w {file_} "{text}" """
    player_command = f"play {file_}"
    run_command = subprocess.Popen(shlex.split(cmd_speaker))
    speak = subprocess.Popen(shlex.split(player_command))

    run_command.wait()
    speak.wait()
    
    os.remove(file_)



# french_speaker("Bonjour ceci est un test", filename="test")
