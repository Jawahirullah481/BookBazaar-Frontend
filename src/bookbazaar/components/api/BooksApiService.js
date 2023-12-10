import { apiClient } from "./ApiClient";

export const getAllBooks = () => {
   // apiClient.get("/books");
   return ([
    {
        "isbn": 9786820810807,
        "bookName": "Introduction to Null",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Gilad James, PhD"
        ],
        "description": null,
        "rating": 3.0,
        "imageUrl": "http://books.google.com/books/content?id=p1HAEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9780323952859,
        "bookName": "Wise Use of Null Hypothesis Tests",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Frank S Corotto"
        ],
        "description": "Few students sitting in their introductory statistics class learn that they are being taught the product of a misguided effort to combine two methods into one. Few students learn that some think the method they are being taught should be banned. Wise Use of Null Hypothesis Tests: A Practitioner’s Handbook follows one of the two methods that were combined: the approach championed by Ronald Fisher. Fisher’s method is simple, intuitive, and immune to criticism. Wise Use of Null Hypothesis Tests is also a user-friendly handbook meant for practitioners. Rather than overwhelming the reader with endless mathematical operations that are rarely performed by hand, the author of Wise Use of Null Hypothesis Tests emphasizes concepts and reasoning. In Wise Use of Null Hypothesis Tests, the author explains what is accomplished by testing null hypotheses—and what is not. The author explains the misconceptions that concern null hypothesis testing. He explains why confidence intervals show the results of null hypothesis tests, performed backwards. Most importantly, the author explains the Big Secret. Many—some say all—null hypotheses must be false. But authorities tell us we should test false null hypotheses anyway to determine the direction of a difference that we know must be there (a topic unrelated to so-called one-tailed tests). In Wise Use of Null Hypothesis Tests, the author explains how to control how often we get the direction wrong (it is not half of alpha) and commit a Type III (or Type S) error. Offers a user-friendly book, meant for the practitioner, not a comprehensive statistics book Based on the primary literature, not other books Emphasizes the importance of testing null hypotheses to decide upon direction, a topic unrelated to so-called one-tailed tests Covers all the concepts behind null hypothesis testing as it is conventionally understood, while emphasizing a superior method Covers everything the author spent 32 years explaining to others: the debate over correcting for multiple comparisons, the need for factorial analysis, the advantages and dangers of repeated measures, and more Explains that, if we test for direction, we are practicing an unappreciated and unnamed method of inference",
        "rating": 5.0,
        "imageUrl": "http://books.google.com/books/content?id=cH-HEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9780192547880,
        "bookName": "Null Subjects in Generative Grammar",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Federica Cognola",
            "Jan Casalicchio"
        ],
        "description": "This book considers the null-subject phenomenon, whereby some languages lack an overtly realized referential subject in specific contexts. In generative syntax-the approach adopted in this volume-the phenomenon has traditionally been explained in terms of a 'pro-drop' parameter with associated cluster properties; more recently, however, it has become clear that pro-drop phenomena do not always correlate with all the initially predicted cluster properties. This volume returns to the centre of the debate surrounding the empirical phenomena associated with null subjects. Experts in the field explore the cluster properties associated with pro-drop; the types of null category involved in null-subject phenomena and their identification; and the typology of null-subject languages, with a special focus on partial null-subject languages. Chapters include both novel empirical data and new theoretical analyses covering the major approaches to null subjects in generative grammar. A wide range of languages are examined, ranging from the most commonly studied in research into null subjects, such as Finnish and Italian, to lesser-studied languages such as Vietnamese and Polish, minority languages such as Cimbrian and Kashubian, and historical varieties such as Old French and Old High German. The research presented also contributes to the understanding of other key syntactic phenomena, such as the nature of control, the role of information structure and semantics in syntax, the mechanisms of language change, and the formalization of language variation. The breadth and depth of the volume will make it a valuable resource not only for generative syntacticians, but also for all those working in the fields of historical linguistics, typology, comparative grammar, semantics, and theoretical and descriptive linguistics more generally.",
        "rating": 2.5,
        "imageUrl": "http://books.google.com/books/content?id=705WDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9780192547880,
        "bookName": "Null Subjects in Generative Grammar",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Federica Cognola",
            "Jan Casalicchio"
        ],
        "description": "This book considers the null-subject phenomenon, whereby some languages lack an overtly realized referential subject in specific contexts. In generative syntax-the approach adopted in this volume-the phenomenon has traditionally been explained in terms of a 'pro-drop' parameter with associated cluster properties; more recently, however, it has become clear that pro-drop phenomena do not always correlate with all the initially predicted cluster properties. This volume returns to the centre of the debate surrounding the empirical phenomena associated with null subjects. Experts in the field explore the cluster properties associated with pro-drop; the types of null category involved in null-subject phenomena and their identification; and the typology of null-subject languages, with a special focus on partial null-subject languages. Chapters include both novel empirical data and new theoretical analyses covering the major approaches to null subjects in generative grammar. A wide range of languages are examined, ranging from the most commonly studied in research into null subjects, such as Finnish and Italian, to lesser-studied languages such as Vietnamese and Polish, minority languages such as Cimbrian and Kashubian, and historical varieties such as Old French and Old High German. The research presented also contributes to the understanding of other key syntactic phenomena, such as the nature of control, the role of information structure and semantics in syntax, the mechanisms of language change, and the formalization of language variation. The breadth and depth of the volume will make it a valuable resource not only for generative syntacticians, but also for all those working in the fields of historical linguistics, typology, comparative grammar, semantics, and theoretical and descriptive linguistics more generally.",
        "rating": 2.5,
        "imageUrl": "http://books.google.com/books/content?id=705WDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9780192547880,
        "bookName": "Null Subjects in Generative Grammar",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Federica Cognola",
            "Jan Casalicchio"
        ],
        "description": "This book considers the null-subject phenomenon, whereby some languages lack an overtly realized referential subject in specific contexts. In generative syntax-the approach adopted in this volume-the phenomenon has traditionally been explained in terms of a 'pro-drop' parameter with associated cluster properties; more recently, however, it has become clear that pro-drop phenomena do not always correlate with all the initially predicted cluster properties. This volume returns to the centre of the debate surrounding the empirical phenomena associated with null subjects. Experts in the field explore the cluster properties associated with pro-drop; the types of null category involved in null-subject phenomena and their identification; and the typology of null-subject languages, with a special focus on partial null-subject languages. Chapters include both novel empirical data and new theoretical analyses covering the major approaches to null subjects in generative grammar. A wide range of languages are examined, ranging from the most commonly studied in research into null subjects, such as Finnish and Italian, to lesser-studied languages such as Vietnamese and Polish, minority languages such as Cimbrian and Kashubian, and historical varieties such as Old French and Old High German. The research presented also contributes to the understanding of other key syntactic phenomena, such as the nature of control, the role of information structure and semantics in syntax, the mechanisms of language change, and the formalization of language variation. The breadth and depth of the volume will make it a valuable resource not only for generative syntacticians, but also for all those working in the fields of historical linguistics, typology, comparative grammar, semantics, and theoretical and descriptive linguistics more generally.",
        "rating": 2.5,
        "imageUrl": "http://books.google.com/books/content?id=705WDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9780192547880,
        "bookName": "Null Subjects in Generative Grammar",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Federica Cognola",
            "Jan Casalicchio"
        ],
        "description": "This book considers the null-subject phenomenon, whereby some languages lack an overtly realized referential subject in specific contexts. In generative syntax-the approach adopted in this volume-the phenomenon has traditionally been explained in terms of a 'pro-drop' parameter with associated cluster properties; more recently, however, it has become clear that pro-drop phenomena do not always correlate with all the initially predicted cluster properties. This volume returns to the centre of the debate surrounding the empirical phenomena associated with null subjects. Experts in the field explore the cluster properties associated with pro-drop; the types of null category involved in null-subject phenomena and their identification; and the typology of null-subject languages, with a special focus on partial null-subject languages. Chapters include both novel empirical data and new theoretical analyses covering the major approaches to null subjects in generative grammar. A wide range of languages are examined, ranging from the most commonly studied in research into null subjects, such as Finnish and Italian, to lesser-studied languages such as Vietnamese and Polish, minority languages such as Cimbrian and Kashubian, and historical varieties such as Old French and Old High German. The research presented also contributes to the understanding of other key syntactic phenomena, such as the nature of control, the role of information structure and semantics in syntax, the mechanisms of language change, and the formalization of language variation. The breadth and depth of the volume will make it a valuable resource not only for generative syntacticians, but also for all those working in the fields of historical linguistics, typology, comparative grammar, semantics, and theoretical and descriptive linguistics more generally.",
        "rating": 2.5,
        "imageUrl": "http://books.google.com/books/content?id=705WDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9780192547880,
        "bookName": "Null Subjects in Generative Grammar",
        "stockQuantity": 4,
        "price": 0.0,
        "authors": [
            "Federica Cognola",
            "Jan Casalicchio"
        ],
        "description": "This book considers the null-subject phenomenon, whereby some languages lack an overtly realized referential subject in specific contexts. In generative syntax-the approach adopted in this volume-the phenomenon has traditionally been explained in terms of a 'pro-drop' parameter with associated cluster properties; more recently, however, it has become clear that pro-drop phenomena do not always correlate with all the initially predicted cluster properties. This volume returns to the centre of the debate surrounding the empirical phenomena associated with null subjects. Experts in the field explore the cluster properties associated with pro-drop; the types of null category involved in null-subject phenomena and their identification; and the typology of null-subject languages, with a special focus on partial null-subject languages. Chapters include both novel empirical data and new theoretical analyses covering the major approaches to null subjects in generative grammar. A wide range of languages are examined, ranging from the most commonly studied in research into null subjects, such as Finnish and Italian, to lesser-studied languages such as Vietnamese and Polish, minority languages such as Cimbrian and Kashubian, and historical varieties such as Old French and Old High German. The research presented also contributes to the understanding of other key syntactic phenomena, such as the nature of control, the role of information structure and semantics in syntax, the mechanisms of language change, and the formalization of language variation. The breadth and depth of the volume will make it a valuable resource not only for generative syntacticians, but also for all those working in the fields of historical linguistics, typology, comparative grammar, semantics, and theoretical and descriptive linguistics more generally.",
        "rating": 2.5,
        "imageUrl": "http://books.google.com/books/content?id=705WDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 0,
        "bookName": "Gain Maximization and Controlled Null Placement Simultaneously Achieved in Aerial Array Patterns",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Charles J. Drane (Jr.)",
            "John F. McIlvenna"
        ],
        "description": null,
        "rating": 0.0,
        "imageUrl": "http://books.google.com/books/content?id=VqUARXhVSOEC&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 0,
        "bookName": "The Late Mrs. Null",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Frank R. Stockton"
        ],
        "description": null,
        "rating": 2.0,
        "imageUrl": "http://books.google.com/books/content?id=2q8RAAAAYAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9783110446173,
        "bookName": "Topic Drop and Null Subjects in German",
        "stockQuantity": 0,
        "price": 59.0,
        "authors": [
            "Ewa Trutkowski"
        ],
        "description": "This monograph deals with argument drop in the German prefield and it presents new insights into null subjects, topic drop and the interpretation of topic dropped elements. Major issues are (inter alia) the drop of structurally vs. obliquely cased arguments and the question on which basis nominative/accusative and dative/genitive can be kept apart. Furthermore, it is shown that the (im)possibility of phi-feature mismatches concerning the antecedent and gap in topic drop dialogues allows to differentiate between coreference and \"real\" (quantifier) binding. Aside from topic drop, (1st/2nd vs. 3rd person) null subjects are investigated across a couple of unrelated languages, also focusing on the presence of syncretisms within verbal inflectional paradigms. It is proven that 1st/2nd person null subjects in German are not an instance of antecedent-dependent topic drop but that they are licensed by discrete verbal inflectional endings. Thus, according to this property, German can be classified as a partial pro-drop language. Next to theoretical discussions and considerations this book offers a broad (empirically covered) data basis, which makes it suitable for both theoretically and empirically interested (generative) linguists.",
        "rating": 3.0,
        "imageUrl": "http://books.google.com/books/content?id=VUIYDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9780358129967,
        "bookName": "CliffsNotes TExES Math 4-8 (115) and Math 7-12 (235)",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Sandra Luna McCune"
        ],
        "description": "CliffsNotes TExES Math 4-8 (115) and Math 7-12 (235) is the perfect way to study for Texas’ middle school and high school math teacher certification tests. Becoming a certified middle school math teacher and high school math teacher in Texas means first passing the TExES Math 4-8 (115) teacher certification test for middle school teachers or the TExES Math 7-12 (235) teacher certification test for high school teachers. This professional teacher certification test is required for all teachers who want to teach math in a Texas middle or high school. Covering each test’s six domains and individual competencies with in-depth subject reviews, this test-prep book also includes two model practice tests with answers and explanations for the Math 4-8 and two model practice tests with answers and explanations for the Math 7-12. Answer explanations detail why correct answers are correct, as well as what makes incorrect answer choices incorrect.",
        "rating": 2.5,
        "imageUrl": "http://books.google.com/books/content?id=M-qpDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 9783540606048,
        "bookName": "Cellular Spaces, Null Spaces and Homotopy Localization",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "Emmanuel Farjoun"
        ],
        "description": "In this monograph we give an exposition of some recent development in homotopy theory. It relates to advances in periodicity in homotopy localization and in cellular spaces. The notion of homotopy localization is treated quite generally and encompasses all the known idempotent homotopy functors. It is applied to K-theory localizations, to Morava-theories, to Hopkins-Smith theory of types. The method of homotopy colimits is used heavily. It is written with an advanced graduate student in topology and research homotopy theorist in mind.",
        "rating": 0.0,
        "imageUrl": "http://books.google.com/books/content?id=BZwMUbyFRAIC&printsec=frontcover&img=1&zoom=5&source=gbs_api"
    },
    {
        "isbn": 0,
        "bookName": "The World of Null-A",
        "stockQuantity": 4,
        "price": 0.0,
        "authors": [
            "Alfred Elton Van Vogt"
        ],
        "description": null,
        "rating": 1.0,
        "imageUrl": "Image not available for this book"
    },
    {
        "isbn": 9781663545046,
        "bookName": "Null and Void",
        "stockQuantity": 0,
        "price": 0.0,
        "authors": [
            "S.C. Lee"
        ],
        "description": "Centuries ago, the world adapted. Humans began to be born with various powers, and now forty percent of the population have said gifts. Some rise to the challenge and fight for the good of the world, while others revel in selfish acts. Society has become accustomed to this change, and most would even call it balanced. However, that delicate equilibrium will soon be upset by the Rebirth Organization, a group that will have the world reborn in the way they see fit. That is the world that Kai Daniels lives in, except he is a little different. Having been born in a prominent family, the attention is always focused on him. He would rather remain average and unnoticed for the majority of his life, but between his brother and his powers, that goal seems unachievable. In fact, what will he do when the world needs him?",
        "rating": 5.0,
        "imageUrl": "http://books.google.com/books/content?id=bQcNEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
    }
])
}

export const getBookByIsbn = (userid, isbn) => {
    // apiClient.get(`/users/${userid}/books/${isbn}`);
    return ({
        "book": {
            "isbn": 9780099549422,
            "bookName": "Thin Paths",
            "stockQuantity": 0,
            "price": 0.0,
            "authors": [
                "Julia Blackburn"
            ],
            "description": "In 1994, while walking the Alta Via, the high path winding from the French border to the Bay of Lerici, a man stopped in a remote village, and found he couldn't forget it. Julia Blackburn married that man and moved to that house in 1999. What she found in the mountains was a new way of life, and one that is fast disappearing.",
            "rating": 0.0,
            "imageUrl": "http://books.google.com/books/content?id=epeJxjHOUIMC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        },
        "inCart": false,
        "inFavourite": false,
        "stock": 0
    }
    );

}