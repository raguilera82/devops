package com.autentia.training.devops.model.entity;

import java.io.Serializable;

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class City implements Serializable{

    private static final long serialVersionUID = -3425696020999145486L;

    private final Integer id;

    private final String name;

    public City(){
        this(null, null);
    }

    @JsonCreator
    public City(@JsonProperty("id") Integer id, @JsonProperty("name") String name){
        super();
        this.id = id;
        this.name = name;
    }

    public Integer getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    @Override
    public int hashCode(){
        return new HashCodeBuilder().append(this.id).toHashCode();
    }

    @Override
    public boolean equals(Object obj){
        final City otherObject = (City) obj;
        return new EqualsBuilder().append(this.id, otherObject.id).isEquals();

    }

    @Override
    public String toString(){
        return new ToStringBuilder(this).append("id", this.id).append("name", this.name).toString();
    }

}
