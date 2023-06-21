'use strict';

const nodemailer = require("nodemailer");
require('dotenv').config();

// parametro que recibe {Nombre: '', Correo: ''};

this.enviar_mail = (data) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let mail_options = {
        from: 'jcalderonca@ucenfotec.ac.cr',
        to: data.Correo,
        subject: `Bienvenido a SICA`,
        // html: `
        //     <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
        //     <tr height="200px">  
        //         <td bgcolor="" width="600px">
        //             <h1 style="color: #fff; text-align:center">Bienvenido al Sistema de Control de Activos SICA</h1>
        //             <p  style="color: #fff; text-align:center">
        //                 a la aplicación
        //             </p>
        //         </td>
        //     </tr>
        //     <tr bgcolor="#fff">
        //         <td style="text-align:center">
        //             <p style="color: #000">¡El registro de su usuario ha sido aprobado!</p>
        //             <p>Su contraseña temporal corresponde a ${data.Pw}. No le revele a nadie esta información</p>
        //         </td>
        //     </tr>
        //     </table>

        // `

        html :  `
        <body style="background-color: #7F167F; color: #ffffff; font-family: Arial, sans-serif;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; height:400px;">
                <tr>
                    <th style="background-color: #d33; color: #ffffff; padding: 10px;">
                    <h2 style="margin: 0;">Bienvenido a la familia PROVEGUARD</h2>
                    </th>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: center;">
                        <p style="color: #000000;">Estimado ${data.Nombre} ${data.PrimerApellido}. Su contraseña temporal para acceder a SICA correspode a: ${data.Pw}. No comparta esta información con nadie</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: center;">
                        <p style="color: #000000;">Somos #1 en administrar activos</p>
                    </td>
                </tr>
            </table>
        </body>
        `
    };

    transporter.sendMail(mail_options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('El correo se envío correctamente ' + info.response);
        }
    });
};
module.exports = this;