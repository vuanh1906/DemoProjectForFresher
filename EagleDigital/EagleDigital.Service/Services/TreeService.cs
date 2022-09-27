using EagleDigital.Common.Model.TenantTwo;
using EagleDigital.Service.IServices;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EagleDigital.Common.Model.TenantTwo;
using EagleDigital.CodeFirst.TenantTwo.Repositories;
using EagleDigital.Service.IServices;

namespace EagleDigital.Service.Services
{
    public class TreeService : ITreeService
    {
        private readonly IEntityRepositoryNewTenant<Tree> _treeRepositoryNew;
        public TreeService(IEntityRepositoryNewTenant<Tree> treeRepositoryNew)
        {
            _treeRepositoryNew = treeRepositoryNew;
        }

        public IQueryable<Tree> List()
        {
            var trees = _treeRepositoryNew.GetAll().OrderBy(p => p.Name);
            return trees;
        }

        public Tree Details(int id)
        {
            var details = _treeRepositoryNew.Get(id);
            return details;
        }

        public Tree Insert(Tree tree)
        {
            var productDetails = new Tree();

            //productDetails.Id = tree.Id;
            productDetails.key = tree.key;
            productDetails.Parent = tree.Parent;
            productDetails.Level = tree.Level;
            productDetails.Name = tree.Name;
            productDetails.Gender = tree.Gender;
            productDetails.Address = tree.Address;
            productDetails.Job = tree.Job;
            productDetails.Phone = tree.Phone;
            productDetails.Image = tree.Image;
            productDetails.BirthDay = tree.BirthDay;
            productDetails.DateDeath = tree.DateDeath;
            productDetails.Info = tree.Info;

            productDetails = _treeRepositoryNew.InsertOnCommit(tree);
            _treeRepositoryNew.CommitChanges();
            return productDetails;
        }

        public Tree Update(Tree tree)
        {
            var productDetails = _treeRepositoryNew.Get(tree.Id);
            //productDetails.Id = tree.Id;
            productDetails.key = tree.key;
            productDetails.Parent = tree.Parent;
            productDetails.Level = tree.Level;
            productDetails.Name = tree.Name;
            productDetails.Gender = tree.Gender;
            productDetails.Address = tree.Address;
            productDetails.Job = tree.Job;
            productDetails.Phone = tree.Phone;
            productDetails.Image = tree.Image;
            productDetails.BirthDay = tree.BirthDay;
            productDetails.DateDeath = tree.DateDeath;
            productDetails.Info = tree.Info;

            _treeRepositoryNew.CommitChanges();
            return productDetails;
        }

        public void Delete(int id)
        {
            var productDetails = _treeRepositoryNew.Get(id);
           _treeRepositoryNew.DeleteOnCommit(productDetails);
           _treeRepositoryNew.CommitChanges();

        }
    }
}
