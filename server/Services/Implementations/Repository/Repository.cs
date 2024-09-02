using Core.Contracts;
using Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Services.Implementations.Repository;

public class Repository(AppDbContext _context) : IRepository
{

    public async Task<IEnumerable<T>> GetAllAsync<T>() where T : class
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetByIdAsync<T>(Guid id) where T : class
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T?> FindAsync<T>(Expression<Func<T, bool>> predicate) where T : class
    {
        return await _context.Set<T>().FirstOrDefaultAsync(predicate);
    }

    public async Task AddAsync<T>(T entity) where T : class
    {
        await _context.Set<T>().AddAsync(entity);
    }

    public async Task UpdateAsync<T>(T entity) where T : class
    {
        _context.Set<T>().Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
        await Task.CompletedTask; // Do something about it. Consider turning it back to synchronous method
    }

    public async Task DeleteAsync<T>(T entity) where T : class
    {
        if (_context.Entry(entity).State == EntityState.Detached)
        {
            _context.Set<T>().Attach(entity);
        }
        _context.Set<T>().Remove(entity);
        await Task.CompletedTask; // Do something about it. Consider turning it back to synchronous method
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
