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
public class BorrarRuta extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
    	
    	 resp.setContentType("application/json");
		 resp.setCharacterEncoding("UTF-8");
    	 String userName = req.getUserPrincipal().getName();
	     
		 DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	     Key userKey = KeyFactory.createKey("Usuario", userName);
	     
	     String nombreR  = req.getParameter("nombreR");
	     
	     String message = "";
	     
	     if(nombreR == null || nombreR.equals(""))
	    	 message = "No hay nombre de ruta";

	     else{
	    	 Query q = new Query("Ruta")
		        .setFilter(new FilterPredicate("nombre",
		                                       FilterOperator.EQUAL, nombreR)).setAncestor(userKey);

	        PreparedQuery pq = datastore.prepare(q);
	        Entity result = pq.asSingleEntity();
	        
	        if(result == null)
	        	message="No existe la ruta";
	        
	        else{
	        	Query q2 = new Query("Punto")
	            .setFilter(new FilterPredicate("nombreRuta", FilterOperator.EQUAL, nombreR)).setAncestor(userKey);
	    	     
	            PreparedQuery pq2 = datastore.prepare(q2);
	           
	            for (Entity result2 : pq2.asIterable())
	            	datastore.delete(result2.getKey());
	            	            
	        	datastore.delete(result.getKey());
	        }
	     }
	     
	     if(message.equals(""))
	    	   resp.getWriter().print("{\"result\": []}");
	     else
	    	   resp.getWriter().print("{\"error\": {\"message\": " + message + "\"}}");
    	
    }

}
