using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;

namespace EagleDigital.Service.IServices
{
    public interface ITreeService
    {
        IQueryable<Tree> List();
        Tree Details(int id);
        Tree Insert(Tree product);
        Tree Update(Tree product);
        void Delete(int id);
    }
}
