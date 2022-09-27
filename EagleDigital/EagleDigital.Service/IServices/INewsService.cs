using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.Service.IServices
{
    public interface INewsService
    {
        IQueryable<News> List();
        News Details(int id);
        News Insert(News product);
        News Update(News product);
        void Delete(int id);
    }
}
