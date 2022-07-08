package member.dao;

import java.util.Map;

import member.bean.MemberDTO;

public interface MemberDAO {

	public void joinTry(MemberDTO memberDTO);

	public String checkEmail(MemberDTO memberDTO);

	public MemberDTO loginTry(Map<String, String> map);
	
}