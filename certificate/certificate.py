import sys
from image_generation import *
import base64

#name=sys.argv[1]
# lastname=sys.argv[2]
# phone=sys.argv[3]





def main():
    image=Image.open(r'C:\Users\sayak\OneDrive\Desktop\server\assets\certificate_template.png')
    cer_demo=certificate(image,"Romit Basu", "Mastering Python Programming", "Neso Academy", "18.09.2023" )
    img=cer_demo.generate_certificate()
    logo=Image.open(r"C:\Users\sayak\OneDrive\Desktop\server\assets\khan_academy_logo.png")
    sign=Image.open(r"C:\Users\sayak\OneDrive\Desktop\server\assets\signature2.png")
    img=cer_demo.add_sign(sign)
    img=cer_demo.add_logo(logo)
    img.save(r'C:\Users\sayak\OneDrive\Desktop\server\assets\certificate_generated_from_python.png')
    
    with open(r'C:\Users\sayak\OneDrive\Desktop\server\assets\certificate_generated_from_python.png', "rb") as image_file:
    # Encode the binary image data to Base64
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")
    #print(base64_image)

if __name__== "__main__" :
    main()

