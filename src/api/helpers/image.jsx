
// const resizeImage = async (file, newWidth, newHeight) => {
//   // Verificar el tamaño del archivo
//   var fileSizeInKB = file.size / 1024; // Convertir a KB
//   var img = new Image();

//   var onloadPromise = new Promise((resolve, reject) => {
//     img.onload = async function() {

//       // Crear un objeto URL para la imagen redimensionada
//       var canvas = document.createElement('canvas');
//       canvas.width = newWidth;
//       canvas.height = newHeight;
//       var ctx = canvas.getContext('2d');
//       ctx.drawImage(this, 0, 0, newWidth, newHeight);
//       var dataUrl = canvas.toDataURL('image/webp'); // Convertir a webp

//       // Convertir dataUrl a Blob para poder cargarlo a Supabase
//       var blob = await (await fetch(dataUrl)).blob();

//       resolve(blob);
//     }

//     img.onerror = reject;
//   });

//   var objectURL = URL.createObjectURL(file);
//   img.src = objectURL;

//   return onloadPromise;
//  }

//  export {resizeImage}




// Recorta la imagen acorde a el ancho haciendo un calculo

const resizeImage = async (file, newWidth) => {
  var img = new Image();

  var onloadPromise = new Promise((resolve, reject) => {
    img.onload = async function () {
      // Calcular el aspecto original de la imagen
      var originalAspectRatio = this.naturalWidth / this.naturalHeight;

      // Calcular el nuevo alto basado en el nuevo ancho y el aspecto original
      var newHeight = newWidth / originalAspectRatio;

      // Crear un objeto URL para la imagen redimensionada
      var canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0, newWidth, newHeight);
      var dataUrl = canvas.toDataURL("image/webp"); // Convertir a webp

      // Convertir dataUrl a Blob para poder cargarlo a Supabase
      var blob = await (await fetch(dataUrl)).blob();

      resolve(blob);
    };

    img.onerror = reject;
  });

  var objectURL = URL.createObjectURL(file);
  img.src = objectURL;

  return onloadPromise;
};

// const resizeImage = async (file, newWidth) => {
//   const img = new Image();

//   const onloadPromise = new Promise((resolve, reject) => {
//     img.onload = async function () {
//       // Calcular el nuevo alto basado en el nuevo ancho y el aspecto original
//       const originalAspectRatio = this.naturalWidth / this.naturalHeight;
//       const newHeight = newWidth / originalAspectRatio;

//       // Crear un objeto de lienzo para la imagen redimensionada
//       const canvas = document.createElement("canvas");
//       canvas.width = newWidth;
//       canvas.height = newHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(this, 0, 0, newWidth, newHeight);

//       // Verificar si el navegador es compatible con WebP
//       const isWebPSupported = canvas
//         .toDataURL("image/webp")
//         .startsWith("data:image/webp");

//       // Convertir dataUrl a Blob según el formato compatible
//       const dataUrl = isWebPSupported
//         ? canvas.toDataURL("image/webp")
//         : canvas.toDataURL("image/jpeg");
//       const blob = await (await fetch(dataUrl)).blob();

//       resolve(blob);
//     };

//     img.onerror = reject;
//   });

//   // Crear un objeto URL para la imagen original
//   const objectURL = URL.createObjectURL(file);
//   img.src = objectURL;

//   return onloadPromise;
// };

// export { resizeImage };

// const resizeImage = async (file, newWidth) => {
//  const img = new Image();

//  const onloadPromise = new Promise((resolve, reject) => {
//    img.onload = function() {
//      const originalAspectRatio = this.naturalWidth / this.naturalHeight;
//      const newHeight = newWidth / originalAspectRatio;

//      const canvas = document.createElement("canvas");
//      canvas.width = newWidth;
//      canvas.height = newHeight;
//      const ctx = canvas.getContext("2d");
//      ctx.drawImage(this, 0, 0, newWidth, newHeight);

//      // Convertir imagen a ObjectURL webp a través de un blob de canvas
//      canvas.toBlob(async function(webpBlob) {
//        const imageURL = URL.createObjectURL(webpBlob);

//        // Cargar imagen para mostrar en la página
//        const scaledImg = await new Promise(function(resolve, reject) {
//          let img = new Image();
//          img.addEventListener("load", function () {
//            resolve(img);
//          });
//          img.setAttribute("src", imageURL);
//        });

//        // Inyectar en el DOM (aquí se resuelve el blob para su uso posterior)
//        const imageLink = document.createElement("a");
//        imageLink.setAttribute("href", imageURL);
//        imageLink.setAttribute('download', `${file.name}.webp`);
//        imageLink.appendChild(scaledImg);
//        const blob = await (await fetch(imageLink)).blob();
//        resolve(blob);
//      }, "image/webp");
//    };
//    img.onerror = reject;
//  });

//  const objectURL = URL.createObjectURL(file);
//  img.src = objectURL;

//  return onloadPromise;
// };

export { resizeImage };
