CREATE PROCEDURE [dbo].[spUsers_GetById]
    @Id INT
AS
BEGIN
    SELECT Id, UserName, FirstName, LastName
    FROM dbo.Users
    WHERE Id = @Id
END