package br.com.coldigogeladeiras.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.coldigogeladeiras.jdbcinterface.MarcaDAO;
import br.com.coldigogeladeiras.modelo.Marca;

public class JDBCMarcaDAO  implements MarcaDAO{
	
	private Connection conexao;
	
	public JDBCMarcaDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public List<Marca> buscar(){
		//Criação da instrução SQL para buscar de todas as marcas
		String comando = "SELECT * FROM marcas";
		
		//Criação de uma lista para armazenar cada marca encontrada
		List<Marca> listMarcas = new ArrayList<Marca>();
		
		//Criação do objeto marca com valor null (ou seja, sem instancia-lo)
		Marca marca = null;
		
		//Abertura do try-catch
		try {
			//Uso da conexão do banco para prepara-lo para uma instrução SQL
			Statement stmt = conexao.createStatement();
			
			//Execução da instrução criada previamente e armazenamento do resultado no objeto rs
			ResultSet rs = stmt.executeQuery(comando);
			
			//Enquanto houver uma próxima linha no resultado
			while(rs.next()) {
				
				//Criação de instância da classe Marca
				marca = new Marca();
				//Recebimento dos 2 dados retornados ao BD para cada linha encontrada
				int id = rs.getInt("id");
				String nome = rs.getString("nome");
				
				//Setando no objeto marca os valores encontrados
				marca.setId(id);
				marca.setNome(nome);
				
				//Adição da instancia contida no objeto Marca na lista de marcas
				listMarcas.add(marca);
			}
			
			//Caso alguma Exception seja gerada no try, recebe-a no objeto "ex"
		}catch(Exception ex) {
			//Exibe a exceção na console
			ex.printStackTrace();
		}
		
		//Retorna para quem chamou o método a lista criada
		return listMarcas;
	}
	
public boolean inserir(Marca marca) {
		
		String comando = "INSERT INTO marcas"
							+"(id, nome)"
							+"VALUES (?,?)";
		PreparedStatement p;
		
		try {
			//prepara o comando para execução no BD em que nos conectamos
			p = this.conexao.prepareStatement(comando);
			
			//Substitui no comando os "?" pelos valores do produto
			p.setInt(1, marca.getId());
			p.setString(2, marca.getNome());
			
			//Executa o comando no BD
			p.execute();
			
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

public List<JsonObject> buscarPorNome(String nome){
	String comando = "SELECT * FROM marcas ";
	
	if (!nome.equals("")) {
		comando += "WHERE nome LIKE '%" + nome + "%' ";
	}
	
	comando += "ORDER BY id ASC, nome ASC";

	List<JsonObject> listaMarcas = new ArrayList<JsonObject>();
	JsonObject marca = null;

	try {
		Statement stmt = conexao.createStatement();
		ResultSet rs = stmt.executeQuery(comando);

		while (rs.next()) {
			int id = rs.getInt("id");
			nome = rs.getString("nome");

			marca = new JsonObject();
			marca.addProperty("id", id);
			marca.addProperty("nome", nome);

			listaMarcas.add(marca);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	return listaMarcas;
}

public boolean deletar(int id) {
	String comando = "DELETE FROM marcas WHERE id = ?";
	PreparedStatement m;
	try {
		m = this.conexao.prepareStatement(comando);
		m.setInt(1, id);
		m.execute();
	} catch(SQLException e) {
		e.printStackTrace();
		return false;
	}
	return true;
	
}

public Marca buscarPorId(int id) {
	String comando = "SELECT * FROM marcas WHERE marcas.id = ?";
	Marca marca = new Marca();
	try {
		PreparedStatement m = this.conexao.prepareStatement(comando);
		m.setInt(1, id);
		ResultSet rs = m.executeQuery();
		while (rs.next()) {
			String nome = rs.getString("nome");

			marca.setId(id);
			marca.setNome(nome);

		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	return marca;
}
public boolean alterar(Marca marca) {
	String comando = "UPDATE marcas " + "SET nome=? " + "WHERE id=? ";
	PreparedStatement m;
	try {
		m = this.conexao.prepareStatement(comando);
		m.setString(1, marca.getNome());
		m.setInt(2, marca.getId());
		m.execute();
	} catch (SQLException e) {
		e.printStackTrace();
		return false;
	}
	return true;
}

}
