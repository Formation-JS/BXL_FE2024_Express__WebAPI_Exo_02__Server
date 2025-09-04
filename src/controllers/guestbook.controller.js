
import {v4 as uuidv4} from "uuid";
import { truncate } from "../utils/truncate.utils.js";

const messages = [
    { id: uuidv4(), author: "Donald Duck", message: "Aïe aïe aïe !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Della Duck", message: "Quelle incroyable aventure nous avons vécue hier soir à Duckburg !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Riri Duck", message: "Trésor trouvé !", hasSpoiler: true, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Fifi Duck", message: "J'ai adoré le dernier épisode de nos aventures !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Loulou Duck", message: "Coucou !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Gontran Duck", message: "Tout est question de style et d'élégance !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Picsou", message: "Argent !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Roxanne Duck", message: "Les mystères de Duckburg sont fascinants et pleins de surprises !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Flagada Jones", message: "Ha ha !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Balthazar Picsou", message: "Un autre coffre à explorer pour augmenter ma fortune colossale !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Miss Tick", message: "Magie !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Grand Ma", message: "Je connais tous les secrets de notre famille depuis des générations !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Donald Duck", message: "Oups !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Della Duck", message: "Les aventures sont toujours plus palpitantes quand on est avec ma famille !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Riri Duck", message: "Top !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Fifi Duck", message: "Aujourd'hui, j'ai appris à voler mon premier drone de chasse au trésor !", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Loulou Duck", message: "Yo !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Gontran Duck", message: "L'élégance et le style sont essentiels pour impressionner tout le monde.", hasSpoiler: false, sendDate: new Date() }, // long
    { id: uuidv4(), author: "Picsou", message: "Cash !", hasSpoiler: false, sendDate: new Date() }, // court
    { id: uuidv4(), author: "Roxanne Duck", message: "Chaque mystère découvert à Duckburg nous rapproche d'aventures encore plus folles !", hasSpoiler: false, sendDate: new Date() } // long
];

const guestbookController = {
    getlist: async (req,res) => {
        
        const list = messages.map(message => ({
            id:message.id,
            author:message.author,
            message:message.hasSpoiler?"Mystere..." : truncate(message.message)
        }));
        const { offset, limit } = req.pagination;

        // Pagination avec slice
        const paginatedlist = list.slice(offset, offset + limit);
        res.status(200).json(paginatedlist);
    },
    insert: async (req,res) => {
        const {message,author,hasSpoiler} = req.body;
        if(!author || !message){
            res.status(422).json({erreur:"message et author sont requis !"});
        }
        const newmessage = {id:uuidv4(),author:author,message:message,hasSpoiler:hasSpoiler,sendDate:new Date()};
        messages.push(newmessage);
        res.status(201).json(newmessage);
    },
    getmessage:async (req,res) => {

        const message = messages.find(message => (message.id === req.params.id));
        if(!message) return res.sendStatus(404);
        
        res.status(200).json(message);
    }
}

export default guestbookController;