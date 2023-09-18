// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const currentModuleFileURL = import.meta.url;
// const __dirname = dirname(fileURLToPath(currentModuleFileURL));

// console.log('Current Module Directory:', __dirname);
import sharp from 'sharp';
import fs from 'fs/promises';

class Certificate {
    constructor(imagePath, name, title, org, date) {
        this.imagePath = imagePath;
        this.name = name;
        this.title = title;
        this.org = org;
        this.date = date;
    }

    async generateCertificate() {
        const image = await sharp(this.imagePath);

        const headerScaleFactor = 3.8;
        const titleScaleFactor = 4.7;
        const headerFontSize = 85;
        const titleFontSize = 70;
        const dateAndSignFontSize = 60;

        const headerX = 680 - (this.name.length - 1) * (headerFontSize / headerScaleFactor);
        const titleX = 680 - (this.title.length - 1) * (titleFontSize / titleScaleFactor);

        const certificateImage = await image
            .clone()
            .png()
            .toBuffer();

        const certificateWithText = await sharp(certificateImage)
            .overlayWith(
                Buffer.from(this.name),
                { top: 460, left: headerX, gravity: sharp.gravity.northwest },
            )
            .overlayWith(
                Buffer.from(this.title),
                { top: 710, left: titleX, gravity: sharp.gravity.northwest },
            )
            .overlayWith(
                Buffer.from(this.org),
                { top: 860, left: 540, gravity: sharp.gravity.northwest },
            )
            .overlayWith(
                Buffer.from(this.date),
                { top: 1180, left: 1200, gravity: sharp.gravity.northwest },
            )
            .toBuffer();

        return certificateWithText;
    }

    async addLogoAndSign(logoPath, signPath) {
        const logo = await sharp(logoPath).resize(225, 225);
        const sign = await sharp(signPath).resize(400, 200);

        const certificateWithLogoAndSign = await sharp(this.imagePath)
            .composite([{ input: logo, left: 736, top: 1050 }])
            .composite([{ input: sign, left: 170, top: 1065 }])
            .toBuffer();

        return certificateWithLogoAndSign;
    }

    async saveToFile(outputPath, imageBuffer) {
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(`Certificate saved to ${outputPath}`);
    }
}

async function main() {
    const imagePath = 'C:\Users\sayak\OneDrive\Desktop\server\assets\certificate_template.png';
    const name = 'Your Name';
    const title = 'Certificate Title';
    const org = 'Your Organization';
    const date = 'Date';

    const certificate = new Certificate(imagePath, name, title, org, date);

    const certificateWithText = await certificate.generateCertificate();

    const logoPath = 'C:\Users\sayak\OneDrive\Desktop\server\assets\khan_academy_logo.png';
    const signPath = 'C:\Users\sayak\OneDrive\Desktop\server\assets\signature2.png';

    const certificateWithLogoAndSign = await certificate.addLogoAndSign(logoPath, signPath);

    const outputPath = 'C:\Users\sayak\OneDrive\Desktop\server\assets\certificate_generated_from_python.png';

    await certificate.saveToFile(outputPath, certificateWithLogoAndSign);
}

main();

