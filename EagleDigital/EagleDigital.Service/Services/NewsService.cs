using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.CodeFirst.TenantTwo.Repositories;
using EagleDigital.Common.Model.TenantTwo;
using EagleDigital.Service.IServices;

namespace EagleDigital.Service.Services
{
    public class NewsService : INewsService
    {
        private readonly IEntityRepositoryNewTenant<News> _newsRepositoryNew;
        public NewsService(IEntityRepositoryNewTenant<News> newsRepositoryNew)
        {
            _newsRepositoryNew = newsRepositoryNew;
        }

        public IQueryable<News> List()
        {
            var news = _newsRepositoryNew.GetAll().Where(p=>p.IsDelete!= true).OrderByDescending(p => p.CreateDate);
            return news;
        }

        public News Details(int id)
        {
            var details = _newsRepositoryNew.Get(id);
            return details;
        }

        public News Insert(News news)
        {
            var productDetails = new News();
            productDetails.Title = news.Title;
            productDetails.Content = news.Content;
            productDetails.CreateDate = DateTime.Now;
            productDetails.IsDelete =false;
           
            productDetails = _newsRepositoryNew.InsertOnCommit(productDetails);
            _newsRepositoryNew.CommitChanges();
            return productDetails;
        }

        public News Update(News news)
        {
            var productDetails = _newsRepositoryNew.Get(news.Id);
            productDetails.Title = news.Title;
            productDetails.Content = news.Content;
            productDetails.CreateDate = DateTime.Now;
            productDetails.IsDelete = false;
            _newsRepositoryNew.CommitChanges();
            return productDetails;
        }

        public void Delete(int id)
        {
            var productDetails = _newsRepositoryNew.Get(id);
            _newsRepositoryNew.DeleteOnCommit(productDetails);
            _newsRepositoryNew.CommitChanges();

        }
    }
}
