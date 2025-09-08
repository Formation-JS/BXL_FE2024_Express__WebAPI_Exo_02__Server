import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../utils/jwt.utils.js";



const users = [
    {
        id: uuidv4(),
        username: "Della",
        role: "Admin",
        email: "della@exemple.com",
        pwd: "$argon2i$v=19$m=16,t=2,p=1$QlpleEw0bWY2dnZhdjV2WQ$e1jm4Y3sBADqm9uvjtSqIg"
    },
    {
        id: uuidv4(),
        username: "Donald",
        role: "Member",
        email: "donald@exemple.com",
        pwd: "$argon2id$v=19$m=16,t=2,p=1$czN4dlUwTGNxYWtaQ2txaw$lShEDvIdfH7nmlhiFNsaLw"
    },
    {
        id: uuidv4(),
        username: "Gontran",
        role: "Visitor",
        email: "gontran@exemple.com",
        pwd: "$argon2id$v=19$m=16,t=2,p=1$anVwVDhHdFJoSHhpeUt4aQ$BO7N1/w3//h48Rbc+yjVQA"
    }
];

const authController = {
    register: async (req, res) => {
        const { username, password, email, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "email et mot de passe sont requis" });
        }

        const userexist = users.find(user => user.email === email);
        if (userexist) {
            return res.status(409).json({ error: "cet email est deja utilisé!" })
        }

        const hashedpassword = await argon2.hash(password);

        const newuser = {
            id: uuidv4(),
            username: username,
            email: email,
            role: role,
            pwd: hashedpassword
        }

        users.push(newuser);
        const token = await generateToken(newuser);
        res.status(200).json({ token });
    },
    login: async (req, res) => {
        const { password, email } = req.body;

        const user = users.find(u => u.email === email)
        if (!user) {
            res.status(400).json({ error: 'credential invalid!' });
            return;
        }
        // ici je cree une pass_db qui est obtenue en hachant avec argon2 le mot de passe Test1234=
        if (!await argon2.verify(user.pwd, password)) {
            res.status(400).json({ error: "Crendantial Invalid!" });
            return;
        }

        // generer un token
        const token = await generateToken(user);
        res.status(200).json({ token });

    },
    updatepassword: async (req, res) => {

        console.log(req.user);

        const { id, newpassword } = req.body;

        const user = users.find(u => u.id === id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const newpwd = await argon2.hash(newpassword);
        user.pwd = newpwd;

        res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
    }
}


export default authController;