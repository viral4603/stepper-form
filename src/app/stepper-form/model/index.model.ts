export interface BasicDetails {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    department: string;
    position: string;
}

export interface AddressDetails {
    address: string,
    streetAddress: string,
    pinCode: string,
    country: string,
    state: string,
    city: string
}

export interface Skills {
    framework: Framework;
    programmingLanguage: ProgrammingLanguage,
    leadershipSkill: number
}
interface Framework {
    [key: string]: number
}
interface ProgrammingLanguage {
    [key: string]: number
}

export interface SelectOption {
    name: string
    id: number
}

export const Framework = [
    {
        "name": "React.js",
        "id": 1
    },
    {
        "name": "Angular",
        "id": 2
    },
    {
        "name": "Vue.js",
        "id": 3
    },
    {
        "name": "Django",
        "id": 4
    },
    {
        "name": "Flask",
        "id": 5
    },
    {
        "name": "TensorFlow",
        "id": 6
    },
    {
        "name": "Spring Framework",
        "id": 7
    },
    {
        "name": "Hibernate",
        "id": 8
    },
    {
        "name": "Apache Struts",
        "id": 9
    },
    {
        "name": "Ruby on Rails",
        "id": 10
    },
    {
        "name": "Sinatra",
        "id": 11
    },
    {
        "name": "ASP.NET",
        "id": 12
    },
    {
        "name": "Entity Framework",
        "id": 13
    },
    {
        "name": "Xamarin",
        "id": 14
    },
    {
        "name": "Laravel",
        "id": 15
    },
    {
        "name": "Symfony",
        "id": 16
    },
    {
        "name": "CodeIgniter",
        "id": 17
    },
    {
        "name": "Gin",
        "id": 18
    },
    {
        "name": "Echo",
        "id": 19
    },
    {
        "name": "SwiftUI",
        "id": 20
    },
    {
        "name": "Combine",
        "id": 21
    },
    {
        "name": "Rocket",
        "id": 22
    },
    {
        "name": "Actix",
        "id": 23
    },
    {
        "name": "Android Jetpack",
        "id": 24
    },
    {
        "name": "Ktor",
        "id": 25
    }

]

export const ProgrammingLanguages = [
    {
        "name": "JavaScript",
        "id": 1
    },
    {
        "name": "Python",
        "id": 2
    },
    {
        "name": "Java",
        "id": 3
    },
    {
        "name": "Ruby",
        "id": 4
    },
    {
        "name": "C# (.NET)",
        "id": 5
    },
    {
        "name": "PHP",
        "id": 6
    },
    {
        "name": "Go (Golang)",
        "id": 7
    },
    {
        "name": "Swift",
        "id": 8
    },
    {
        "name": "Rust",
        "id": 9
    },
    {
        "name": "Kotlin (Android)",
        "id": 10
    },
    {
        "name": "C++",
        "id": 11
    },
    {
        "name": "TypeScript",
        "id": 12
    },
    {
        "name": "C",
        "id": 13
    },
    {
        "name": "Perl",
        "id": 14
    },
    {
        "name": "Haskell",
        "id": 15
    },
    {
        "name": "Scala",
        "id": 16
    },
    {
        "name": "Dart",
        "id": 17
    },
    {
        "name": "Lua",
        "id": 18
    },
    {
        "name": "R",
        "id": 19
    },
    {
        "name": "Objective-C",
        "id": 20
    },
    {
        "name": "Shell",
        "id": 21
    },
    {
        "name": "Perl",
        "id": 22
    },
    {
        "name": "SQL",
        "id": 23
    },
    {
        "name": "PowerShell",
        "id": 24
    },
    {
        "name": "Julia",
        "id": 25
    }
]