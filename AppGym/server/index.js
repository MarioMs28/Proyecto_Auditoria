require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/notify-login', async (req, res) => {
    const { email, date } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Falta el correo electrónico del usuario' });
    }

    try {
        const mailOptions = {
            from: `"AppGym Bot" <${process.env.EMAIL_USER}>`,
            to: 'mariomonterosanchez123@gmail.com', // El correo al que llegarán las notificaciones
            subject: `Nuevo inicio de sesión en AppGym: ${email}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #ff0000; text-align: center;">¡Nuevo Inicio de Sesión! 🏋️</h2>
                    <p>Hola Administrador,</p>
                    <p>Se ha detectado un nuevo inicio de sesión en el sistema AppGym.</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ff0000; margin: 20px 0;">
                        <ul style="list-style-type: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 10px;"><strong>Usuario:</strong> ${email}</li>
                            <li><strong>Fecha y Hora:</strong> ${date || new Date().toLocaleString()}</li>
                        </ul>
                    </div>
                    <p>Puedes monitorear su actividad detallada desde tu <strong>Panel de Administración</strong>.</p>
                    <br>
                    <p style="font-size: 12px; color: #888; text-align: center;"><em>Este es un correo automático generado por tu sistema Fit Manager. Por favor no respondas a este mensaje.</em></p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[${new Date().toLocaleString()}] Notificación enviada. Usuario: ${email}`);
        
        res.status(200).json({ message: 'Notificación enviada correctamente', messageId: info.messageId });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar la notificación por correo' });
    }
});

app.listen(port, () => {
    console.log(`Servidor de notificaciones escuchando en http://localhost:${port}`);
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'pon_tu_contraseña_aqui') {
        console.warn('⚠️  ADVERTENCIA: No has configurado tu contraseña de aplicación en el archivo .env');
    }
});
