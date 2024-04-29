from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255)
    FirstName = models.CharField(max_length=255)
    Role = models.CharField(max_length=255)
    Email = models.EmailField(unique=True)
    PhoneNumber = models.CharField(max_length=15)
    ProfilePicture = models.CharField(max_length=255)
    Gender = models.CharField(max_length=10)
    Interests = models.CharField(max_length=255)
    Location = models.CharField(max_length=255)
    Bio = models.TextField()
    RegistrationDate = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'backend'

    def __str__(self):
        return self.name

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    Status = models.CharField(max_length=20)
    Location = models.CharField(max_length=255)
    Date = models.DateField()
    Time = models.TimeField()
    CreationDate = models.DateTimeField(auto_now_add=True)
    Users = models.ManyToManyField(User)

    class Meta:
        app_label = 'backend'

    def __str__(self):
        return self.name

class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    ActivityName = models.CharField(max_length=255)
    Description = models.TextField()
    Category = models.CharField(max_length=255)
    Users = models.ManyToManyField(User)

    class Meta:
        app_label = 'backend'

    def __str__(self):
        return self.name

class Conversation(models.Model):
    id = models.AutoField(primary_key=True)
    EventID = models.ForeignKey(Event, on_delete=models.CASCADE)
    CreationDate = models.DateTimeField(auto_now_add=True)
    Users = models.ManyToManyField(User)

    class Meta:
        app_label = 'backend'

    def __str__(self):
        return self.name

class Message(models.Model):
    id = models.AutoField(primary_key=True)
    ConversationID = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    Content = models.TextField()
    Timestamp = models.DateTimeField(auto_now_add=True)
    Status = models.CharField(max_length=20)

    class Meta:
        app_label = 'backend'

    def __str__(self):
        return self.name

class Review(models.Model):
    id = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    LastName = models.CharField(max_length=255)
    FirstName = models.CharField(max_length=255)
    Rating = models.IntegerField()
    Comment = models.TextField()
    Timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'backend'

    def __str__(self):
        return self.name