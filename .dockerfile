# Usa la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json (si está disponible) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de tu aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]