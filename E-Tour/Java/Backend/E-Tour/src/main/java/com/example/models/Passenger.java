package com.example.models;

import java.sql.Date;
import jakarta.persistence.*;


@Entity
public class Passenger {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int Paxid;
	
	@JoinColumn(name="bookingID", referencedColumnName="bookingID", nullable=false)
	//private BookingHeader bookingheader;
	
	private String Type;
	private double Amount;
	private long phoneNumber;
	private int age;
	
	 @ManyToOne
	    @JoinColumn(name = "customerid", referencedColumnName = "customerid", nullable = false)
	    private Customer customer; // Many-to-One relationship with Customer
	
	private String Paxname;
	
	public int getPaxid() {
		return Paxid;
	}
	public void setPaxid(int paxid) {
		Paxid = paxid;
	}
	public String getPaxname() {
		return Paxname;
	}
	public void setPaxname(String paxname) {
		Paxname = paxname;
	}

	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public double getAmount() {
		return Amount;
	}
	public void setAmount(double amount) {
		Amount = amount;
	}
	
	
}