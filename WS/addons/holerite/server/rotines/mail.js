var nodemailer = require('nodemailer');
var cfg = require('../../../../config/index');

var email = {
    user: cfg.mail.user,
    pass: cfg.mail.pass,
    toemail: 'folhadepagamento@valinhos.sp.gov.br'
}



function func(ctx, next, perm) {
    ctx.body.route += ",Mail_holerite";

    /*
    https://myaccount.google.com/u/2/lesssecureapps?pageId=none&pli=1
    //*/

    var name = ctx.body.data.data.name;
    var matric = ctx.body.data.data.matric;
    var mess = ctx.body.data.data.mess;
    var cpf = ctx.body.data.data.cpf;

    if (name != undefined &&
        matric != undefined &&
        mess != undefined &&
        cpf != undefined
    ) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: email.user,
                pass: email.pass
            }
        });
        //*/
        var mailOptions = {
            from: email.user,
            to: email.toemail,
            subject: "Holerite Matricula: " + matric,
            text: "Nome: " + name + "\n" +
                "Matricula: " + matric + "\n" +
                "CPF: " + cpf + "\n" +
                "Mensagem: " + mess
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        ctx.body.data.data = { status: "sended" };
    }

    return ctx;
}

module.exports = func