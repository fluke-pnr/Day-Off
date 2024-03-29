const nodemailer = require('nodemailer')
const custom = require('../controller/customDataController');
// config mail >>
const sender = 'pongnarit.fk@gmail.com'
const password = 'Pongnarit30666'
// config transporter >>
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender, // your email
    pass: password // your email password
  }
});

function mailApproved(rowDatas,user,manager){

  let startDate = custom.createDateToStringforEmail(rowDatas.startdate)
  let endDate = custom.createDateToStringforEmail(rowDatas.enddate)

    // set text >>
    let mailOptions = {
        from: sender ,// sender
        to: user.email,// list of receivers
        subject: 'Leave Request Response',// Mail subject
        html: 'Dear K. '+user.name+'<br>'+
              'Subject Leave Request Response.<br><br>'+
              'Your request for '+rowDatas.detailleave+' on '+startDate+' - '+endDate+'<br>'+
              '<h1 style="color: #5CB85C">Has been approved.</h1><br><br>'+
              
              'Please go back to work, When the time limit is reached.<br><br>'+
              'Best regards,<br>'+
              'Artisan Digital Asia Co .,Ltd.<br><br>'+
              'This is an automatically generated email. Do not reply. If you have any problems<br>'+
              'with the service please contact your company Artisan Digital Administrator.<br>'+
              'Approved by K. '+manager.name+'<br><br>'+
              '<a href="https://day-off-frontend.herokuapp.com">Go to Website</a>'
      };
      // send >>
      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            return 'fail';
            console.log(err)
        }else{
            return 'succes';
            console.log(info);
        }
     });
};
function mailRejected(rowDatas,user,manager){

  let startDate = custom.createDateToStringforEmail(rowDatas.startdate)
  let endDate = custom.createDateToStringforEmail(rowDatas.enddate)

  // set text >>
  let mailOptions = {
      from: sender,// sender
      to: user.email,// list of receivers
      subject: 'Leave Request Response',// Mail subject
      html: 'Dear K. '+user.name+'<br>'+
      'Subject Leave Request Response.<br><br>'+
      'Your request for '+rowDatas.detailleave+' on '+startDate+' - '+endDate+'<br>'+
      '<h1 style="color: #C9302C">Has been rejected.</h1><br><br>'+
      
      'Please go back to work, When the time limit is reached.<br><br>'+
      'Best regards,<br>'+
      'Artisan Digital Asia Co .,Ltd.<br><br>'+
      'This is an automatically generated email. Do not reply. If you have any problems<br>'+
      'with the service please contact your company Artisan Digital Administrator.<br>'+
      'Reject by K. '+manager.name+'<br><br>'+
      '<a href="https://day-off-frontend.herokuapp.com">Go to Website</a>'
    };
    // send >>
    transporter.sendMail(mailOptions, function (err, info) {
      if(err){
            return 'fail';
            console.log(err)
      }else{
            return 'succes';
            console.log(info);
      }
   });
};

function mailRequestManager(managerEmail,row){
    let textbutton = '<a href="https://day-off-backend.herokuapp.com/updateLeaveRequestFromEmail/'+row.rowid+'/'+managerEmail.email+'"><button style="background-color: #5CB85C;border: none;border-radius: 5px;padding: 10px 30px;color: #fff;"">Approve</button></a>'+' '+
                     '<a href="https://day-off-backend.herokuapp.com/removeLeaveRequestFromEmail/'+row.rowid+'/'+managerEmail.email+'"><button  style="background-color: #C9302C;border: none;border-radius: 5px;padding: 10px 30px;color: #fff;">Reject</button></a><br><br>'
    let textresponse = 'Please response leave request from K. '+row.user.name+'<br>'
    
    if(row.type == "Sick Leave"){
      textbutton = ''
      textresponse = ''
    }

    let startDate = custom.createDateToStringforEmail(row.startdate)
    let endDate = custom.createDateToStringforEmail(row.enddate)

    
    
    let mailOptions = {
        from: sender,// sender
        to: ""+managerEmail.email,// list of receivers
        subject: 'Leave Request Response',// Mail subject
        html: 'Dear K. '+managerEmail.name+'<br>'+
        'Subject Request for Leave from K. '+row.user.name+'<br><br>'+
        textresponse+
        'Request as <br>'+
        '&emsp;&emsp;&emsp;&emsp;&emsp; '+row.type+' ('+startDate+', '+row.starttime+' to '+endDate+', '+row.endtime+') <br><br>'+
        '&emsp;&emsp;&emsp;&emsp;&emsp; Description : '+row.detailleave+' <br><br>'+
                
        'Best regards,<br>'+
        'Artisan Digital Asia Co .,Ltd.<br><br>'+
        'This is an automatically generated email. Do not reply. If you have any problems<br>'+
        'with the service please contact your company Artisan Digital Administrator.<br><br>'+
        
        textbutton+

        '<a href="https://day-off-frontend.herokuapp.com">Go to Website</a>',

      }
      // send >>
        transporter.sendMail(mailOptions, function (err, info) {
            if(err){

            }else{

            }
        });

  }

module.exports = {
    mailApproved,
    mailRejected,
    mailRequestManager
}
