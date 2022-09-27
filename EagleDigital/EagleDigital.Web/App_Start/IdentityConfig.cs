using System.Linq;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using CoreLib;
using EagleDigital.Web.Models;


namespace EagleDigital.Web.Models
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser, int>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser, int> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options,
            IOwinContext context)
        {
            var manager = new ApplicationUserManager(new ApplicationUserStore(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser, int>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            // Configure user lockout defaults
            manager.UserLockoutEnabledByDefault = true;
            manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            manager.MaxFailedAccessAttemptsBeforeLockout = 5;
            // Register two factor authentication providers. This application uses Phone and Emails as a step of receiving a code for verifying the user
            // You can write your own provider and plug in here.
            manager.RegisterTwoFactorProvider("PhoneCode", new PhoneNumberTokenProvider<ApplicationUser, int>
            {
                MessageFormat = "Your security code is: {0}"
            });
            manager.RegisterTwoFactorProvider("EmailCode", new EmailTokenProvider<ApplicationUser, int>
            {
                Subject = "SecurityCode",
                BodyFormat = "Your security code is {0}"
            });
            manager.EmailService = new EmailService();
            manager.SmsService = new SmsService();
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<ApplicationUser, int>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }

    // Configure the RoleManager used in the application. RoleManager is defined in the ASP.NET Identity core assembly
    public class ApplicationRoleManager : RoleManager<ApplicationRole, int>
    {
        public ApplicationRoleManager(IRoleStore<ApplicationRole,int> roleStore)
            : base(roleStore)
        {
        }

        public static ApplicationRoleManager Create(IdentityFactoryOptions<ApplicationRoleManager> options, IOwinContext context)
        {
            return new ApplicationRoleManager(new ApplicationRoleStore(context.Get<ApplicationDbContext>()));
        }
    }

    public class Message : IdentityMessage
    {
        public string CC { get; set; }
        public string Bcc { get; set; }    
    }
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your email service here to send an email.
            //return Task.FromResult(0);

            // Credentials:
            var credentialUserName = System.Configuration.ConfigurationManager.AppSettings["MailAccount"];
            var sentFrom = System.Configuration.ConfigurationManager.AppSettings["MailFrom"];
            var sentFromName = System.Configuration.ConfigurationManager.AppSettings["MailFromName"];
            var pwd = System.Configuration.ConfigurationManager.AppSettings["MailPassword"];
            var host = System.Configuration.ConfigurationManager.AppSettings["MailHost"];
            var port = System.Configuration.ConfigurationManager.AppSettings["MailPort"];
            var enableSSL = System.Configuration.ConfigurationManager.AppSettings["MailEnableSSL"];

            // Configure the client:
            System.Net.Mail.SmtpClient client =
                new System.Net.Mail.SmtpClient(host);

            client.Port = int.Parse(port);
            client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;

            // Create the credentials:
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential(credentialUserName, pwd);
            client.EnableSsl = bool.Parse(enableSSL);
            client.Credentials = credentials;

            //Create sent from
            var mailFrom = new System.Net.Mail.MailAddress(sentFrom, sentFromName);
            //Create sent to
            var mailTo = new System.Net.Mail.MailAddress(message.Destination, message.Destination);
            // Create the message:
            var mail =
                new System.Net.Mail.MailMessage(mailFrom, mailTo);
            mail.Subject = message.Subject;
            mail.Body = message.Body;
            mail.IsBodyHtml = true;

            // Send:
            return client.SendMailAsync(mail);
        }



        public Task SendAsync(Message message, string attachmentCremation, string attachmentLegalNext, string attachmentGoodsServices)
        {
            // Plug in your email service here to send an email.
            //return Task.FromResult(0);

            // Credentials:
            var credentialUserName = System.Configuration.ConfigurationManager.AppSettings["MailAccount"];
            var sentFrom = System.Configuration.ConfigurationManager.AppSettings["MailFrom"];
            var sentFromName = System.Configuration.ConfigurationManager.AppSettings["MailFromName"];
            var pwd = System.Configuration.ConfigurationManager.AppSettings["MailPassword"];
            var host = System.Configuration.ConfigurationManager.AppSettings["MailHost"];
            var port = System.Configuration.ConfigurationManager.AppSettings["MailPort"];
            var enableSSL = System.Configuration.ConfigurationManager.AppSettings["MailEnableSSL"];

            // Configure the client:
            System.Net.Mail.SmtpClient client =
                new System.Net.Mail.SmtpClient(host);

            client.Port = int.Parse(port);
            client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;

            // Create the credentials:
            System.Net.NetworkCredential credentials =
                new System.Net.NetworkCredential(credentialUserName, pwd);
            client.EnableSsl = bool.Parse(enableSSL);
            client.Credentials = credentials;

            ////Create sent from
            //var mailFrom = new System.Net.Mail.MailAddress(sentFrom, sentFromName);
            ////Create sent to
          

            //var mailTo = new System.Net.Mail.MailAddress(message.Destination, message.Destination);
            
            // Create the message:
            var mail =
                new System.Net.Mail.MailMessage();

            mail.From = new MailAddress(sentFrom, sentFromName);

            var listDestination = message.Destination.Split(';').ToList();
            foreach (var item in listDestination)
            {
                mail.To.Add(item);
            }

            if (!string.IsNullOrEmpty(message.CC))
            {
                var listCC = message.CC.Split(';').ToList();
                foreach (var item in listCC)
                {
                    mail.CC.Add(item);
                }    
            }

            if (!string.IsNullOrEmpty(message.Bcc))
            {
                var listBcc = message.Bcc.Split(';').ToList();
                foreach (var item in listBcc)
                {
                    mail.Bcc.Add(item);
                }    
            }
           
            mail.Subject = message.Subject;
            mail.Body = message.Body;
            mail.IsBodyHtml = true;

            //Attachment
            Collection<string> mailAttachments = new Collection<string>();
            if (!string.IsNullOrEmpty(attachmentCremation))
            {
                mailAttachments.Add(attachmentCremation);
            }
            mailAttachments.Add(attachmentLegalNext);
            mailAttachments.Add(attachmentGoodsServices);

            foreach (var filePath in mailAttachments)
            {
                if (!string.IsNullOrEmpty(filePath))
                {
                    var attachment = new Attachment(filePath);
                    mail.Attachments.Add(attachment);    
                }
            }

            client.SendCompleted += (o,e) =>
            {
                mail.Attachments.Dispose();
                mail.Dispose();
	        };

            // Send:
            return client.SendMailAsync(mail);
        }
    }

    public class SmsService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your sms service here to send a text message.
            return Task.FromResult(0);
        }
    }

    // This is useful if you do not want to tear down the database each time you run the application.
    // public class ApplicationDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
    // This example shows you how to create a new database if the Model changes
    public class ApplicationDbInitializer : CreateDatabaseIfNotExists<ApplicationDbContext> 
    {
        protected override void Seed(ApplicationDbContext context) {
            InitializeIdentityForEF(context);
            base.Seed(context);
        }

        //Create User=Admin@Admin.com with password=Admin@123456 in the Admin role        
        public static void InitializeIdentityForEF(ApplicationDbContext db) {
            var userManager = HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            var roleManager = HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();
            const string name = "bold9800@gmail.com";
            const string password = "Abcde@12345-";
            const string roleName = RoleConstants.Admin;

            //Create Role Admin if it does not exist
            var role = roleManager.FindByName(roleName);
            if (role == null) {
                role = new ApplicationRole(roleName);
                var roleresult = roleManager.Create(role);
            }

            var user = userManager.FindByName(name);
            if (user == null) {
                user = new ApplicationUser
                {
                    UserName = name, 
                    Email = name,
                    CreatedDate = DateTime.UtcNow,
                    DisplayName = "Administrator"
                };
                var result = userManager.Create(user, password);
                result = userManager.SetLockoutEnabled(user.Id, false);
            }

            // Add user admin to Role Admin if not already added
            var rolesForUser = userManager.GetRoles(user.Id);
            if (!rolesForUser.Contains(role.Name)) {
                var result = userManager.AddToRole(user.Id, role.Name);
            }
        }
    }

    public class ApplicationSignInManager : SignInManager<ApplicationUser, int>
    {
        public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager) : 
            base(userManager, authenticationManager) { }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user)
        {
            return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);
        }

        public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context)
        {
            return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
        }
    }
}