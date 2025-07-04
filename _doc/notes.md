https://play.google.com/apps/internaltest/4701446069369223123

# EAS Build

```sh
eas build -p android



# Opcional pero recomendable: limpia el prebuild anterior
rm -rf android
rm -rf android ios
npx expo prebuild
eas build -p android

```
