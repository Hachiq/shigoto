using Core.Shared;
using System.Linq.Expressions;

namespace Core.Contracts;

public interface IRepository
{
    Task<IEnumerable<T>> GetAllAsync<T>() where T : BaseEntity;
    Task<T?> GetByIdAsync<T>(Guid id) where T : BaseEntity;
    Task<T?> FindAsync<T>(Expression<Func<T, bool>> predicate) where T : BaseEntity;
    Task AddAsync<T>(T entity) where T : BaseEntity;
    void Update<T>(T entity) where T : BaseEntity;
    void Delete<T>(T entity) where T : BaseEntity;
    Task SaveChangesAsync();
}
