using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;

namespace EagleDigital.CodeFirst.TenantTwo.Repositories
{
    
    public interface IEntityRepositoryNewTenant<T>
     where T : class
    {

        //IEnumerable<T> ExecWithStoreProcedure<T>(string query, params object[] parameters);
        IEnumerable<T> ExecWithStoreProcedure(string query, params object[] parameters);
        void CommitChanges();
        void DeleteOnCommit(T entity);
        T Get(int key);
        IQueryable<T> GetAll();
        T InsertOnCommit(T entity);
    }

}
