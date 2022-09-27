using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Runtime.Remoting.Contexts;

namespace EagleDigital.CodeFirst.TenantTwo.Repositories
{
   public class EntityRepositoryNewTenant<T> : IEntityRepositoryNewTenant<T> where T : class
    {
         private readonly INewTenantContext _context;

         public EntityRepositoryNewTenant(INewTenantContext context)
        {
            _context = context;
        }

       //public IEnumerable<T> ExecWithStoreProcedure(string query, params object[] parameters)
       //{
       //    return _context.ex .SqlQuery<T>(query, parameters);
       //}

       //public IEnumerable<T1> ExecWithStoreProcedure<T1>(string query, params object[] parameters)
       //{
       //    return _context.Set<T>().SqlQuery<T>(query, parameters);
       //  //  throw new System.NotImplementedException();
       //}

       public IEnumerable<T> ExecWithStoreProcedure(string query, params object[] parameters)
       {
          return  _context.Set<T>().SqlQuery(query, parameters).ToList();

          // return DbSet.SqlQuery(query, parameters).ToList();
         // throw new System.NotImplementedException();
       }

       public void CommitChanges()
        {
            _context.SaveChanges();
        }

        public void DeleteOnCommit(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public T Get(int key)
        {
            return _context.Set<T>().Find(key);
        }

        public IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public T InsertOnCommit(T entity)
        {
            _context.Set<T>().Add(entity);
            //entity.InsAt = DateTime.Now;
            //entity.UpdAt = DateTime.Now;
            return entity;
        }
    }
}
