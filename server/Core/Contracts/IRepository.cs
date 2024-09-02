namespace Core.Contracts;

public interface IRepository
{
    IEnumerable<T> GetAll<T>() where T : class;
    T? GetById<T>(Guid id) where T : class;
    void Add<T>(T entity) where T : class;
    void Update<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    void SaveChanges();
}
