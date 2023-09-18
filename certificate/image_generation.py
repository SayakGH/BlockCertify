from PIL import Image, ImageDraw, ImageFont

class certificate:
    # Creating class variables/ static variables
    # Load your custom font
    # Declaring the custom sizes and scale factors
    
    customSizefor_header = 85
    customSizefor_title = 70
    customSizefor_date= custonSizefor_sign = 60
    custom_font_header = ImageFont.truetype("comic.ttf", customSizefor_header)
    custom_font_title = ImageFont.truetype("comic.ttf", customSizefor_title)
    custom_font_date=ImageFont.truetype("arial.ttf",customSizefor_date)

    header_Scalefactor=3.8
    title_Scalefactor=4.7
    
    # Constructor taking arguments for name, course title, date, organisation,etc
    def __init__(self, image , name , title , org , date):
        self.image = image
        self.name = name
        self.title = title
        self.org = org
        self.date = date
        

    def generate_certificate(self):
        # Create a drawing context and render text onto the image
        draw = ImageDraw.Draw(self.image)

        #Getting the lengths for creating alignment factor algorithms
        headerLength = len(self.name)-1
        titleLength = len(self.title)-1

        #Creating alignment adjustments for the (x,y) coordinates according to length and putting the texts
        #with the help of draw.text

        draw.text((680-(headerLength*certificate.customSizefor_header/certificate.header_Scalefactor),460), self.name, fill="black", font= certificate.custom_font_header,stroke_width=2)
        draw.text((680-(titleLength*certificate.customSizefor_title/certificate.title_Scalefactor),710), self.title, fill="black", font=certificate.custom_font_title,stroke_width=2)
        draw.text((540, 860), self.org , fill="black", font=certificate.custom_font_header,stroke_width=2)
        draw.text((1200,1180), self.date , fill="black", font=certificate.custom_font_date,stroke_width=1)

        return self.image

    # Adding logo to the certificate
    def add_logo(self,logo):
        logo = logo.resize((225,225))  # Resizing the logo
        (self.image).paste(logo,(736,1050))  # Adding the pixels to the default image
        return self.image
    
    def add_sign(self,sign):
        sign=sign.resize((400,200))
        (self.image).paste(sign,(170,1065))
        return self.image
    