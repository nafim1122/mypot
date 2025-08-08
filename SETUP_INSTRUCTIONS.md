# Adding Your Profile Image

To add your profile image to the portfolio:

1. Add your profile photo to the `public/assets/images` directory with the name `profile.jpg`
2. Alternatively, you can modify the image path in `src/components/sections/About.tsx` to point to your actual image

Note: Make sure the image is optimized for web with a reasonable file size (less than 500KB) for better performance.

The provided image in the conversation should be saved as `public/assets/images/profile.jpg`.

# Adding Project Images

1. Add project preview images to the `public/assets/images` directory with names like:
   - project1.jpg
   - project2.jpg
   - project3.jpg
   - project4.jpg
   - project5.jpg

# Adding Background Music

1. Add your preferred background music as an MP3 file to `public/assets/audio/background-music.mp3`
2. Make sure the file size is optimized for web (ideally less than 2MB)

# Email Setup

1. Install EmailJS package: `npm install @emailjs/browser`
2. Update the credentials in `src/config/email.ts` with your EmailJS service ID, template ID, and user ID
3. Follow the instructions in the config file to set up your EmailJS account and template
