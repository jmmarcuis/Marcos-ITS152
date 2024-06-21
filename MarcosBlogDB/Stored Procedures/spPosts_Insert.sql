
CREATE PROCEDURE [dbo].[spPosts_Insert]
	@userID int,
	@title nvarchar(150),
	@body text,
	@dateCreated datetime2
AS
begin 
INSERT INTO dbo.Posts(UserId,Title,Body,DateCreated)
VALUES(@userID,@title,@body,@dateCreated)
end