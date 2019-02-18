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
public class ListarRutasUser extends HttpServlet{
	@Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
    	
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		String userName = req.getUserPrincipal().getName();
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key userKey = KeyFactory.createKey("Usuario", userName);
				
		Query q = new Query("Ruta").addSort("nombre", SortDirection.ASCENDING).setAncestor(userKey);
		
		PreparedQuery pq = datastore.prepare(q);		

        String message = "{\"result\": [";
        
		for (Entity result : pq.asIterable())
			message += "\"" + (String) result.getProperty("nombre") + "\",";
        
        if(message.endsWith(","))		
			message = message.substring(0, message.length()-1);
        
		message += "]}";
		
		resp.getWriter().print(message);  
	    
    }
}
