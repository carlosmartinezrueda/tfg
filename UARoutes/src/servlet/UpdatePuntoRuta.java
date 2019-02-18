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
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

@SuppressWarnings("serial")
public class UpdatePuntoRuta extends HttpServlet{
	@Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
		
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		String userName = req.getUserPrincipal().getName();
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key userKey = KeyFactory.createKey("Usuario", userName);
		
		String nombreR = req.getParameter("nombreR");
		String nombreP = req.getParameter("nombreP");
		String pos = req.getParameter("pos");
		String message = "";
		
		if(nombreR == null || nombreR.equals(""))
	    	 message = "No hay nombre de ruta";
	    
	    else if(nombreP == null || nombreP.equals(""))
	    	message = "No hay nombre del punto";
		
	    else if(pos == null || pos.equals(""))
	    	message = "El punto no tiene posici�n en la ruta";	
		
	    else{
	    	Filter rutaFilter = new FilterPredicate("nombreRuta", FilterOperator.EQUAL, nombreR);
			Filter puntoFilter = new FilterPredicate("nombrePunto", FilterOperator.EQUAL, nombreP);
			Filter compuesto = CompositeFilterOperator.and(rutaFilter, puntoFilter);
			
			Query q = new Query("Punto").setFilter(compuesto).setAncestor(userKey);
			PreparedQuery pq = datastore.prepare(q);
	        
			Entity result = pq.asSingleEntity();
			
			if(result != null){
				result.setProperty("posicion", pos);
	    	    datastore.put(result);
			}
			else
				message = "No existe ese punto para actualizar";
	    }
	     
		if(message.equals(""))
	 	   resp.getWriter().print("{\"result\": []}");
		else
	 	   resp.getWriter().print("{\"error\": {\"message\": " + message + "\"}}");
	}
}
