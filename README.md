# CAFM Pro Mobile Application

## Building and Running the App

### Android:

```
npm run android
```

### IOS:

```
npm run ios
```

## Creating an Android APK

### 1) Generating an upload key

#### Windows

On Windows `keytool` must be run from `C:\Program Files\Java\jdkx.x.x_x\bin`, as administrator.

#### macOS

On macOS, if you're not sure where your JDK bin folder is, then perform the following command to find it:

```
/usr/libexec/java_home
```

It will output the directory of the JDK, which will look something like this:

```
/Library/Java/JavaVirtualMachines/jdkX.X.X_XXX.jdk/Contents/Home
```

Navigate to that directory by using the command `cd /your/jdk/path` and use the keytool command with sudo permission as shown below.

```
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2) Setting up Gradle variables

Edit the file `~/.gradle/gradle.properties` or `android/gradle.properties`, and add the following (replace `*****` with the correct keystore password, alias and key password).

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

### 3) Adding signing config to your app's Gradle config

Edit the file `android/app/build.gradle` in your project folder, and add the signing config.

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

### 4) Running the build command

Navigate to the android folder and run the following command:

```
./gradlew assembleRelease
```

### 5) Finding the generated APK file

You can find the apk files by navigating the following directories:

```
/CAFM_Mobile/android/app/build/outputs/apk
```
