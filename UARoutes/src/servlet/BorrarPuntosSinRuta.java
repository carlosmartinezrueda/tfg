package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

@SuppressWarnings("serial")
public class BorrarPuntosSinRuta extends HttpServlet{
	@Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
		
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		String userName = req.getUserPrincipal().getName();
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	    Key userKey = KeyFactory.createKey("Usuario", userName);
     
	    Query q = new Query("Punto").addSort("nombreRuta", SortDirection.ASCENDING).setAncestor(userKey);
	    Query q2 = new Query("Ruta").addSort("nombre", SortDirection.ASCENDING).setAncestor(userKey);
		
		PreparedQuery pq = datastore.prepare(q);
		PreparedQuery pq2 = datastore.prepare(q2);
        String nombreRuta = "";
        String nombreRutaPunto = "";
        boolean aux = false;
        
		for (Entity result : pq.asIterable()){
			nombreRutaPunto = (String) result.getProperty("nombreRuta");
			for (Entity result2 : pq2.asIterable()){
				nombreRuta = (String) result2.getProperty("nombre");				
				if(nombreRuta.equals(nombreRutaPunto))
					aux = true;
			}
			if(aux == false)
				datastore.delete(result.getKey());
			aux = false;
		}
	    
		resp.getWriter().print("{\"result\": []}");
    }
}

