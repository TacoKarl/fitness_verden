API call to get mail

{
    "groupnumber": "17",
    "prefix": "jof"
}

mail: jof_boss@fitness.dk
// Manager
Email = "{prefix}_boss@fitness.dk",
FirstName = "Manager",
LastName = "The Boss",
AccountType = Manager,
Password = "asdfQWER",

// Personal trainers
Email = "jof_m@fit.dk",
FirstName = "Superman",
LastName = "Mars",
AccountType = PersonalTrainer,
Password "aQ",

Email = "jof_w@fit.dk ",
FirstName = "Superwoman",
LastName = "Venus",
AccountType = PersonalTrainer,
Password = "aZ"

// Clients
Email = "jof_c1@fit.dk ",
FirstName = "John",
LastName = "Doe",
AccountType = Models.Enums.Role.Client,
Password = "aA",
PersonalTrainerId = 2

Email = "jof_c2@fit.dk ",
FirstName = "Jane",
LastName = "Doe",
AccountType = Models.Enums.Role.Client,
Password = "aA",
PersonalTrainerId = 3
