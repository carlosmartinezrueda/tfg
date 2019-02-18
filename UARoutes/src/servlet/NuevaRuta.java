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
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

@SuppressWarnings("serial")
public class NuevaRuta extends HttpServlet{
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException, ServletException {
		
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		String userName = req.getUserPrincipal().getName();
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key userKey = KeyFactory.createKey("Usuario", userName);
		
		String nombre  = req.getParameter("nombre");
		String descripcion = req.getParameter("descripcion");
	    String message = "";
	     
	    if(nombre == null || nombre.equals(""))
	    	 message = "No hay nombre de ruta";
	    
	    else if(descripcion == null || descripcion.equals(""))
	    	message = "No hay descripcion de la ruta";
	     
	    else{
		   Query q = new Query("Ruta")
		        .setFilter(new FilterPredicate("nombre",
		                                       FilterOperator.EQUAL, nombre)).setAncestor(userKey);

	       PreparedQuery pq = datastore.prepare(q);
	       Entity result = pq.asSingleEntity();
	      
	       if(result == null){
	    	   Entity newruta = new Entity("Ruta", userKey);
	    	   newruta.setProperty("nombre", nombre);
	    	   newruta.setProperty("descripcion", descripcion);
	    	   datastore.put(newruta);			
	       }
	       else
	    	   message = "Ya existe esa ruta";  
		 }
	     
	     if(message.equals(""))
	    	   resp.getWriter().print("{\"result\": {\"nombre\": \"" + nombre + "\", \"descripcion\": \"" + descripcion + "\"}}");
	     else
	    	   resp.getWriter().print("{\"error\": {\"message\": \"" + message + "\"}}");
	}
}
