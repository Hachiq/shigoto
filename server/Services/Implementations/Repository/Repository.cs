using Core.Contracts;
using Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Services.Implementations.Repository;

public class Repository(AppDbContext _context) : IRepository
{

    public IEnumerable<T> GetAll<T>() where T : class
    {
        return _context.Set<T>().ToList();
    }

    public T? GetById<T>(Guid id) where T : class
    {
        return _context.Set<T>().Find(id);
    }

    public void Add<T>(T entity) where T : class
    {
        _context.Set<T>().Add(entity);
    }

    public void Update<T>(T entity) where T : class
    {
        _context.Set<T>().Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }

    public void Delete<T>(T entity) where T : class
    {
        if (_context.Entry(entity).State == EntityState.Detached)
        {
            _context.Set<T>().Attach(entity);
        }
        _context.Set<T>().Remove(entity);
    }

    public void SaveChanges()
    {
        _context.SaveChanges();
    }
}
