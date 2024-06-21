using BlogDataLibrary.Database;
using BlogDataLibrary.Models;
using BlogDataLibrary.Data;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace BlogTestUI
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SqlData db = GetConnection();

            // display the main menu
            while (true)
            {
                Console.Clear();
                Console.WriteLine("----------------------------");
                Console.WriteLine("Blogify: A Mini Blog App");
                Console.WriteLine("1. Register");
                Console.WriteLine("2. Login");
                Console.WriteLine("3. Access Authorized Menu (Debug)");
                Console.WriteLine("4. Exit");
                Console.WriteLine("----------------------------");
                Console.Write("Choose an option: ");
                var choice = Console.ReadLine();

                if (choice == "1")
                {
                    Console.WriteLine("----------------------------");
                    Console.WriteLine("Register an account");
                    Register(db);
                }
                else if (choice == "2")
                {
                    Console.WriteLine("----------------------------");
                    Console.WriteLine("Login using an existing account");
                    Authenticate(db);
                }
                else if (choice == "3")
                {
                    Console.WriteLine("----------------------------");
                    Console.WriteLine("Accessing Authorized Menu (Debug)");
                    var user = new UserModel { UserName = "debug_user" }; // Create a debug user
                    AuthorizedMenu(db, user);
                }
                else if (choice == "4")
                {
                    Console.WriteLine("Exiting the program...");
                    break;
                }
                else
                {
                    Console.WriteLine("Invalid choice. Press Enter to try again...");
                    Console.ReadLine();
                }
            }
        }

        static SqlData GetConnection()
        {
            // Build configuration
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory()) // Set base path
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true); // Add appsettings.json

            IConfiguration config = builder.Build(); // Build the configuration

            // Initialize the database access
            ISqlDataAccess dbAccess = new SqlDataAccess(config);
            SqlData db = new SqlData(dbAccess);

            return db;
        }

        private static UserModel GetCurrentUser(SqlData db)
        {
            Console.Clear();
            Console.Write("Username: ");
            string username = Console.ReadLine();

            Console.Write("Password: ");
            string password = Console.ReadLine();

            // Authenticate user
            UserModel user = db.Authenticate(username, password);
            return user;
        }

        public static void Authenticate(SqlData db)
        {
            while (true)
            {
                UserModel user = GetCurrentUser(db);
                if (user == null)
                {
                    Console.WriteLine("Wrong credentials. Would you like to try again? (y/n)");
                    var retryChoice = Console.ReadLine()?.ToLower();
                    if (retryChoice != "y")
                    {
                        return;
                    }
                }
                else
                {
                    Console.WriteLine($"Hello, {user.UserName}");
                    Console.Write("Press enter to continue...");
                    Console.ReadLine();
                    AuthorizedMenu(db, user);
                    return;
                }
            }
        }

        public static void Register(SqlData db)
        {
            Console.WriteLine("Enter new username: ");
            var username = Console.ReadLine();

            Console.WriteLine("Enter new password: ");
            var password = Console.ReadLine();

            Console.WriteLine("Enter new first name: ");
            var firstname = Console.ReadLine();

            Console.WriteLine("Enter new last name: ");
            var lastname = Console.ReadLine();

            try
            {
                db.Register(username, password, firstname, lastname);
                Console.WriteLine("Registration successful.");
                UserModel user = db.Authenticate(username, password);
                if (user != null)
                {
                    Console.Write("Press enter to proceed to the authenticated menu...");
                    Console.ReadLine();
                    AuthorizedMenu(db, user);
                }
                else
                {
                    Console.WriteLine("Registration successful");
                    Console.Write("Press enter to return to the main menu...");
                    Console.ReadLine();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Registration failed. " + ex.Message);
                Console.Write("Press enter to return to the main menu...");
                Console.ReadLine();
            }
        }

        public static void AuthorizedMenu(SqlData db, UserModel user)
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine($"Welcome, {user.UserName}");
                Console.WriteLine("1. Add Post");
                Console.WriteLine("2. List Posts");
                Console.WriteLine("3. Show Post Details");
                Console.WriteLine("4. Logout");
                Console.Write("Choose an option: ");
                var choice = Console.ReadLine();

                if (choice == "1")
                {
                    bool repeatAdd;

                    Console.WriteLine("----------------------------");
                    Console.WriteLine("Add a new post");
                    do
                    {
                        AddPost(db, user);
                        Console.Clear();
                        Console.WriteLine("----------------------------");
                        Console.Write("Post has sucessfully made Do you want to create another post? [y/n]");
                        repeatAdd = Console.ReadLine()?.ToLower() == "y";
                    } while (repeatAdd);

                    Console.Write("Press Enter to go back...");
                    Console.ReadLine();
                }
                else if (choice == "2")
                {
                    Console.WriteLine("----------------------------");
                    Console.WriteLine("All Posts");
                    ListPosts(db);
                    Console.Write("Press enter to go back..");
                    Console.ReadLine();
                }
                else if (choice == "3")
                {
                    Console.WriteLine("----------------------------");
                    Console.WriteLine("Post Details");
                    ShowPostDetails(db);
                    Console.Write("Press enter to go back..");
                    Console.ReadLine();
                }
                else if (choice == "4")
                {
                    break;
                }
                else
                {
                    Console.WriteLine("Invalid choice. Press Enter to try again...");
                    Console.ReadLine();
                }
            }
        }

        private static void AddPost(SqlData db, UserModel user)
        {
            Console.WriteLine("Title: ");
            string title = Console.ReadLine();

            Console.WriteLine("Write Body: ");
            string body = Console.ReadLine();

            PostModel post = new PostModel
            {
                Title = title,
                Body = body,
                DateCreated = DateTime.Now,
                UserID = user.Id
            };

            db.AddPost(post);
        }

        private static void ListPosts(SqlData db)
        {
            List<ListPostModel> posts = db.ListPosts();

            if (posts.Count == 0)
            {
                Console.WriteLine("No posts available.");
                return;
            }
            Console.Clear();
            Console.WriteLine("{0,-5} {1,-30} {2,-20} {3,-20} {4,-10}", "ID", "Title", "User", "Body", "Date");
            Console.WriteLine(new string('-', 85));

            foreach (ListPostModel post in posts)
            {
                string truncatedBody = post.Body.Length > 20 ? post.Body.Substring(0, 20) + "..." : post.Body;
                Console.WriteLine("{0,-5} {1,-30} {2,-20} {3,-20} {4,-10}", post.Id, post.Title, post.UserName, truncatedBody, post.DateCreated.ToString("yyyy-MM-dd"));
            }
            Console.WriteLine(new string('-', 85));

        }

        private static void ShowPostDetails(SqlData db)
        {
            // I added an exception handling if the user inputs an invalid post ID
            Console.Write("Enter a post ID: ");
            if (!int.TryParse(Console.ReadLine(), out int id))
            {
                Console.WriteLine("Invalid input. Please enter a valid post ID.");
                return;
            }

            ListPostModel post = db.ShowPostDetails(id);
            if (post == null)
            {
                Console.WriteLine($"No post found with ID {id}");
                return;
            }
            Console.Clear();
            Console.WriteLine("----------------------------");
            Console.WriteLine("Post Details");
            Console.WriteLine("----------------------------");
            Console.WriteLine($"ID: {post.Id}");
            Console.WriteLine($"Title: {post.Title}");
            Console.WriteLine($"Author: {post.FirstName} {post.LastName} ({post.UserName})");
            Console.WriteLine($"Date Created: {post.DateCreated.ToString("MMM d yyyy")}");
            Console.WriteLine("----------------------------");
            Console.WriteLine("Body:");
            Console.WriteLine(post.Body);
            Console.WriteLine("----------------------------");
        }

    }
}
