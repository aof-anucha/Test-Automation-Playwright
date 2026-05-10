def cipher(text, shift):
    new_text = ""
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for char in text:
        if char.upper() in alphabet:
            new_text += alphabet[alphabet.index(char.upper()) - (shift % 26)]
        else:
            new_text += char
    return new_text

if __name__ == "__main__":
    text = "VTAOG"
    shift = 29
    print(cipher(text, shift))
