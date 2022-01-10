import image1 from "../img/smiles/smile_bad_big_grey.png";
import image2 from "../img/smiles/smile_ducked_up_big_grey.png";
import image3 from "../img/smiles/smile_sad_big_grey.png";
import image4 from "../img/smiles/smile_alright_big_grey.png";
import image5 from "../img/smiles/smile_excelent_big_grey.png";
import image1Click from "../img/smiles/smile_bad_big.png";
import image2Click from "../img/smiles/smile_ducked_up_big.png";
import image3Click from "../img/smiles/smile_sad_big.png";
import image4Click from "../img/smiles/smile_alright_big.png";
import image5Click from "../img/smiles/smile_excelent_big.png";
import image1min from "../img/smiles/smile_bad.png";
import image2min from "../img/smiles/smile_ducked_up.png";
import image3min from "../img/smiles/smile_sad.png";
import image4min from "../img/smiles/smile_alright.png";
import image5min from "../img/smiles/smile_excelent.png";
import imageAbsent from "../img/smiles/smile_is_absent.png";
export const smilesStore = [
    {
        Text: "Nothing",
        imageDefault: imageAbsent,
        imageSmall: imageAbsent,
        alt: "smile is absent",
    },
    {
        Text: "VeryLow",
        imageDefault: image1,
        imageOnClick: image1Click,
        imageSmall: image1min,
        alt: "smile very low",
    },
    {
        Text: "Low",
        imageDefault: image2,
        imageOnClick: image2Click,
        imageSmall: image2min,
        alt: "smile low",
    },
    {
        Text: "Okay",
        imageDefault: image3,
        imageOnClick: image3Click,
        imageSmall: image3min,
        alt: "smile okay",
    },
    {
        Text: "Good",
        imageDefault: image4,
        imageOnClick: image4Click,
        imageSmall: image4min,
        alt: "smile good",
    },
    {
        Text: "Great",
        imageDefault: image5,
        imageOnClick: image5Click,
        imageSmall: image5min,
        alt: "smile great",
    },
];
