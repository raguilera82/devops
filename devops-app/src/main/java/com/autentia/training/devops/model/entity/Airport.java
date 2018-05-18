package com.autentia.training.devops.model.entity;

import java.io.Serializable;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Airport implements Serializable{

    private static final long serialVersionUID = 1234276014687318411L;
    
    private final String code;
    
    private final String name;
    
    
    public Airport(){
        this(null,null,null);
    }

    private final City city;
    
    @JsonCreator
    public Airport(@JsonProperty("code") String code, @JsonProperty("name") String name, @JsonProperty("city") City city){
        super();
        this.code = code;
        this.name = name;
        this.city = city;
    }

    public String getCode(){
        return code;
    }

    public String getName(){
        return name;
    }

    public City getCity(){
        return city;
    }

    @Override
    public int hashCode(){
        return new HashCodeBuilder().append(this.code).toHashCode();
    }

    @Override
    public boolean equals(Object obj){
        final Airport otherObject = (Airport) obj;
        return new EqualsBuilder().append(this.code, otherObject.code).isEquals();

    }

    @Override
    public String toString(){
        return new ToStringBuilder(this).append("code", this.code).append("name", this.name).append("city", this.city)
                .toString();
    }

}
