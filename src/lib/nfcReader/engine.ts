// if ("NDEFReader" in window) {
//     console.log('Check for native NFC in the browser')
//     /* This is a genuine Android phone with NFC enabled */
//     NDEFReader.prototype.on = function (event, handler) {
//         // Decode un record de type "url"
//         function readUrlRecord(record) {
//             console.assert(record.recordType === "url");
//             const textDecoder = new TextDecoder();
//             let urlValue = textDecoder.decode(record.data);
//             console.log(`URL: ${urlValue}`);
//             return urlValue;
//         }

//         // Adaptation pour gérer les données de l'événement NFC de manière personnalisée
//         const wrappedHandler = (_event) => {
//             // Crée un objet événement personnalisé pour le handler
//             try {
//                 if (nfcDeviceState() === nfcDeviceStateEnum.scanning) {
//                     setNfcDeviceState(nfcDeviceStateEnum.processing)
//                     const message = _event.message;
//                     console.log(`Data received from WebNFC: ${JSON.stringify(_event)}`)
//                     for (const record of message.records) {
//                         console.log("Record type:  " + record.recordType);
//                         console.log("MIME type:    " + record.mediaType);
//                         console.log("Record id:    " + record.id);
//                         switch (record.recordType) {
//                             case "url":
//                                 handler({
//                                     message: {
//                                         records: [{recordType: "URL", data: readUrlRecord(record)}]
//                                     }
//                                 });
//                                 break;
//                         }
//                     }
//                 }
//             } finally {
//                 setNfcDeviceState(nfcDeviceStateEnum.ready);
//             }
//         };

//         // Stocke le handler enveloppé pour pouvoir le retirer plus tard
//         this._handlers = this._handlers || {};
//         this._handlers[event] = this._handlers[event] || [];
//         this._handlers[event].push({original: handler, wrapped: wrappedHandler});

//         // Utilise addEventListener pour écouter l'événement NFC
//         this.addEventListener(event, wrappedHandler);
//     };
//     NDEFReader.prototype.off = function (event, handler) {
//         // Vérifie si le handler a été enregistré
//         if (this._handlers && this._handlers[event]) {
//             const handlerIndex = this._handlers[event].findIndex(h => h.original === handler);
//             if (handlerIndex !== -1) {
//                 // Retire le handler enveloppé
//                 const wrappedHandler = this._handlers[event][handlerIndex].wrapped;
//                 this.removeEventListener(event, wrappedHandler);

//                 // Nettoie le stockage des handlers
//                 this._handlers[event].splice(handlerIndex, 1);
//                 if (this._handlers[event].length === 0) {
//                     delete this._handlers[event];
//                 }
//             }
//         }
//     };
//     window.WebNFC = new NDEFReader();

//     setNfcDevice(nfcDeviceEnum.device)
// } else {
//     /* NFC is disabled */
//     window.WebNFC = new FakeNDEFReader();
//     setNfcDevice(nfcDeviceEnum.fake)
// }
// } catch {
// // NFC in unsupported
// window.WebNFC = new FakeNDEFReader();
// setNfcDevice(nfcDeviceEnum.fake)
// } finally {
// setNfcDeviceState(nfcDeviceStateEnum.init)
// }
