package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;

@SuppressWarnings("serial")
public class BuscarRuta extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
    	
    	resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	    
	    String nombreR  = req.getParameter("nombre");
	     
	    Query q = new Query("Ruta")
        .setFilter(new FilterPredicate("nombre", FilterOperator.EQUAL, nombreR));
	    
	    PreparedQuery pq = datastore.prepare(q);
        Entity result = pq.asSingleEntity();
        
        String message="";
        
		if(result == null)
			resp.getWriter().print("{\"error\": {\"message\": \"No existe la ruta\"}}");
		
		else{
			Query q2 = new Query("Punto")
	        .setFilter(new FilterPredicate("nombreRuta", FilterOperator.EQUAL, nombreR))
	                      	    		 .addSort("posicion", SortDirection.ASCENDING);;
		     
	        PreparedQuery pq2 = datastore.prepare(q2);
	        
	        @SuppressWarnings("deprecation")
			int c = pq2.countEntities();
	        
			for (Entity result2 : pq2.asIterable()){
	        	String nombreP= (String) result2.getProperty("nombrePunto");
	        	String lat = (String) result2.getProperty("lat");
	        	String lng = (String) result2.getProperty("lng");
	        	String desc = (String) result2.getProperty("descripcion");
	        	
				message += "{\"nombreP\":\"" + nombreP + "\", " + 
							"\"desc\":\"" + desc + "\", " +
							"\"lat\":\"" + lat + "\", " +
							"\"lng\":\"" + lng + "\"" +
							"}";
				if(c!=1)
					message += ", "; c--;
	        }
	        
	        String descripcion = "";
	        
			descripcion = (String) result.getProperty("descripcion");       
			resp.getWriter().print("{\"result\": {\"nombre\": \"" + nombreR + "\", \"descripcion\": \"" + descripcion + "\", \"Puntos\": [" + message + "]}}");
		}
        
    }

}
