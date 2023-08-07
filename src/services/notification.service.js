const { dialog } = require('electron');
class NotificationService {

  

  constructor() {
  }

  presentMessageBox = (type, param) => {
    return dialog.showMessageBox({
      title: param.title,
      message: `${param.title}: ${param.detail}`,
      buttons: ["OK"],
      type: type,
      noLink: true,
    });
  };


  presentAndHandleMessage = async (type, param) => {
  let response = await dialog.showMessageBox( {
        type: type,
        buttons: ['Ok', 'Exit'],
        cancelId: 1,
        defaultId: 0,
        title: param.title,
        detail: param.detail
      })

      return response
  };
}

module.exports = NotificationService;
