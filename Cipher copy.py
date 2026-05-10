def cipher(text, shift):
    new_text = ""
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for char in text:
        if char.upper() in alphabet:
            new_text += alphabet[alphabet.index(char) - shift]
        else:
            new_text += char
    return new_text
    
def cipherV2(text, shift):
    new_text = ""
    for char in text:
        if char.isalpha():
            new_char = chr((ord(char) - ord('A') - shift) % 26 + ord('A'))
            new_text += new_char
        else:
            new_text += char
    return new_text

def modulo(a, b):
    return (a % b)

if __name__ == "__main__":
    text = "VTAOG"
    shift = 2
    print(modulo(2, 5))
