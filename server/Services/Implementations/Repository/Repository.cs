﻿using Core.Contracts;
using Core.Shared;
using Data.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Services.Implementations.Repository;

public class Repository(AppDbContext _context) : IRepository
{

    public async Task<IEnumerable<T>> GetAllAsync<T>() where T : BaseEntity
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetByIdAsync<T>(Guid id) where T : BaseEntity
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T?> FindAsync<T>(Expression<Func<T, bool>> predicate) where T : BaseEntity
    {
        return await _context.Set<T>().FirstOrDefaultAsync(predicate);
    }

    public async Task AddAsync<T>(T entity) where T : BaseEntity
    {
        await _context.Set<T>().AddAsync(entity);
    }

    public void Update<T>(T entity) where T : BaseEntity
    {
        _context.Set<T>().Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }

    public void Delete<T>(T entity) where T : BaseEntity
    {
        if (_context.Entry(entity).State == EntityState.Detached)
        {
            _context.Set<T>().Attach(entity);
        }
        _context.Set<T>().Remove(entity);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
